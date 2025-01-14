import createHttpError from "http-errors";
import bcrypt from "bcrypt"
import { randomBytes } from "crypto";
import path from "node:path";
import { readFile } from "fs/promises";
import Handlebars from "handlebars";

import UserCollection from "../db/models/Users.js";
import SessionsCollection from "../db/models/Session.js";

import { sendEmail } from "../utils/sendEmail.js";
import { env } from "../utils/env.js";
import jwt from "jsonwebtoken";

import { refreshTokenLifeTime, accessTokenLifeTime } from "../constants/users.js";
import { TEMPLATES_DIR } from "../constants/index.js";
const { SMTP_FROM } = process.env;

const emailTemplatePath = path.join(TEMPLATES_DIR, "reset-password-email.html");

const emailTemplateSource = await readFile(emailTemplatePath, "utf-8");

const appDomain = env("APP_DOMAIN");
const jwtSecret = env("JWT_SECRET");

const createSessionData = () => ({
    accessToken: randomBytes(30).toString("base64"),
    refreshToken: randomBytes(30).toString("base64"),
    accessTokenValidUntil: Date.now() + accessTokenLifeTime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
})

export const register = async (payload) => {
    const { email, password } = payload;

    const user = await UserCollection.findOne({ email });
    if (user) {
        throw createHttpError(409, "User already exist")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = UserCollection.create({ ...payload, password: hashPassword });

    const template = Handlebars.compile(emailTemplateSource);

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" })

    const html = template({
        link: `${appDomain}/verify?token=${token}`
    })

    const verifyEmail = {
        from: SMTP_FROM,
        to: email,
        subject: "Verify email",
        html,
    }

    await sendEmail(verifyEmail)

    return newUser;
}

export const verify = async token => {
    try {
        const { email } = jwt.verify(token, jwtSecret)
        const user = await UserCollection.findOne({ email })
        if (!user) {
            throw createHttpError(401, "User not found")
        }
        await UserCollection.findOneAndUpdate({ _id: user._id }, { verify: true })
    }
    catch (error) {
        throw createHttpError(401, error.message)
    }
}

export const login = async ({ email, password }) => {
    const user = await UserCollection.findOne({ email });

    if (!user) {
        throw createHttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw createHttpError(401, "Email or Password invalid");
    }

    if (!user.verify) {
        throw createHttpError(401, "Email not verified")
    }

    await SessionsCollection.deleteOne({ userId: user._id })

    const sessionData = createSessionData();
    return SessionsCollection.create({
        userId: user._id,
        ...sessionData
    })
}

export const refreshToken = async (payload) => {
    const oldSession = await SessionsCollection.findOne({
        _id: payload.sessionId,
        refreshToken: payload.refreshToken
    })

    if (!oldSession) {
        throw createHttpError(401, "Session not found");
    }

    if (Date.now > oldSession.refreshTokenValidUntil) {
        throw createHttpError(401, "Refresh token expired");
    }

    await SessionsCollection.deleteOne({ _id: payload.sessionId })

    const sessionData = createSessionData();
    return SessionsCollection.create({
        userId: oldSession.userId,
        ...sessionData
    })

}

export const logout = async sessionId => {
    await SessionsCollection.deleteOne({ _id: sessionId });
}

export const getSession = filter => SessionsCollection.findOne(filter);

export const getUser = filter => SessionsCollection.findOne(filter);
