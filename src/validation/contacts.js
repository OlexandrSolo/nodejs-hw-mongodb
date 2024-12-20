import Joi from "joi"
import { typeList } from "../constants/contacts.js"

export const contactsAddSchema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    phoneNumber: Joi.string().required().min(8).max(12),
    email: Joi.string(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList).required()
});

export const contactsUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(8).max(12),
    email: Joi.string(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList)
})