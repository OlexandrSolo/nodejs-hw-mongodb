import { Schema, model } from "mongoose";

import { handleSaveError, setUpdateSetting } from "./hooks.js";
import { emailRegex } from "../../constants/users.js";

export const userSchema = Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        match: emailRegex,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
})

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSetting);
userSchema.post("findOneAndUpdate", handleSaveError);

const userCollection = model("user", userSchema);

export default userCollection;