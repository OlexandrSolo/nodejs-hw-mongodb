import { Schema, model } from "mongoose";

const contactSchema = new Schema({
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
        enum: ["work", "home", "personal"],
        required: true,
    },
});

const ContactCollection = model("contact", contactSchema);

export default ContactCollection;