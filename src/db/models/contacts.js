import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contacts.js";

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
},
    {
        timestamps: true,
        versionKey: false
    });
const ContactsCollection = model("contacts", contactsSchema);

export default ContactsCollection;