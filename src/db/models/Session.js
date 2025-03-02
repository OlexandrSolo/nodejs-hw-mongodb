import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    accessToken: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    },
    accessTokenValidUntil: {
        type: Date,
        require: true
    },
    refreshTokenValidUntil: {
        type: Date,
        require: true
    }
}, {
    versionKey: false,
    timestamps: true
})

sessionSchema.post("save", handleSaveError);

sessionSchema.pre("findOneAndUpdate", handleSaveError)

sessionSchema.post("findOneAndUpdate", handleSaveError);

const SessionsCollection = model("session", sessionSchema);

export default SessionsCollection;
