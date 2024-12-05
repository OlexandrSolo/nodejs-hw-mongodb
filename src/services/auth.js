import createHttpError from "http-errors";
import UserCollection from "../db/models/User.js";

export const register = async payload => {
    const { email } = payload;
    const user = await UserCollection.findOne({ email });

    if (user) throw createHttpError(409, "Email already in use")

    return UserCollection.create(payload)
} 