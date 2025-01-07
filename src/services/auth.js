import createHttpError from "http-errors";
import bcrypt from "bcrypt"
import { randomBytes } from "crypto";

import UserCollection from "../db/models/Users.js";
import SessionsCollection from "../db/models/Session.js";

import { refreshTokenLifeTime, accessTokenLifeTime } from "../constants/users.js";

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

    return newUser;
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
    SessionsCollection.deleteOne({ _id: sessionId });
}

export const getSession = filter => SessionsCollection.findOne(filter);

export const getUser = filter => SessionsCollection.findOne(filter);
