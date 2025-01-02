import UserCollection from "../db/models/Users.js";

export const register = async (payload) => {
    const newUser = UserCollection.create(payload);

    return newUser;
}