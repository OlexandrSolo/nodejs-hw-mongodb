import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contacts.js";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: true,
    },
    contactType: {
        type: String,
        default: "personal",
        enum: typeList,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    });

contactsSchema.post("save", handleSaveError);
contactsSchema.pre("findOneAndUpdate", setUpdateSetting);
contactsSchema.post("findOneAndUpdate", handleSaveError);

export const sortByList = ["name", "phoneNumber", "email", "isFavourite", "contactType"];

const ContactsCollection = model("contacts", contactsSchema);

export default ContactsCollection;