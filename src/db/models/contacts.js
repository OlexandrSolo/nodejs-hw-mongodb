import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contacts.js";
import { handleSaveError } from "./hooks.js";

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        default: "personal",
        enum: [...typeList],
        required: true,
    },
},
    {
        timestamps: true,
        versionKey: false
    });

contactsSchema.post("save", handleSaveError);

contactsSchema.pre("findOneAndUpdate", handleSaveError)


contactsSchema.post("findOneAndUpdate", handleSaveError)

const ContactsCollection = model("contacts", contactsSchema);

export default ContactsCollection;