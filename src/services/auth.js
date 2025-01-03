import createHttpError from "http-errors";
import bcrypt from "bcrypt"
import { randomBytes } from "crypto";

import UserCollection from "../db/models/Users.js";
import SessionsCollection from "../db/models/Session.js";

import { refreshTokenLifeTime, accessTokenLifeTime } from "../constants/users.js";

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

    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");

    return SessionsCollection.create({
        user: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: Date.now() + accessTokenLifeTime,
        refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
    })
}