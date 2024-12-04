import Joi from "joi";
import { emailRegex } from "../constants/users";

export const authRegisterSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required()
})

export const authLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
}) 