import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";
import { emailRegexp } from "../../constants/users.js";

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
    }
    // =============== VERIFY =============== 
    /*
    verify: {
        type: Boolean,
        default: false,
        require: true
    }
    */
}, {
    versionKey: false,
    timestamps: true
});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const UserCollection = model("user", userSchema);

export default UserCollection;