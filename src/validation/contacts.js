import Joi from "joi";
import { typeList } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        "any.required": "name - поле не має бути пустим",
        "string.min": "у поля name мінімальна довжина 3 символи",
        "string.max": "у поля name максимальна довжина 20 символів"
    }),
    phoneNumber: Joi.number().required().messages({
        "any.required": "phoneNumber - поле не має бути пустим"
    }),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean().required().messages({
        "any.required": "isFavourite - поле не має бути пустим"
    }),
    contactType: Joi.string().min(3).max(20).valid(...typeList)
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        "string.min": "у поля name мінімальна довжина 3 символи",
        "string.max": "у поля name максимальна довжина 20 символів"
    }),
    phoneNumber: Joi.number(),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20).valid(...typeList)
})