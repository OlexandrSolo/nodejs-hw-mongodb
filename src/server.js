import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

import { UPLOAD_DIR } from './constants/index.js';

import { env } from "./utils/env.js";
import contactsRouter from "./routers/contacts.js"
import authRouter from "./routers/auth.js";

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";
import { logger } from "./middlewares/logger.js";


export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    // app.use(logger)

    app.use('/uploads', express.static(UPLOAD_DIR));

    app.use("/auth", authRouter)

    app.use('/contacts', contactsRouter);

    app.use('/contacts/:contactId', contactsRouter);

    app.use('/api-docs', swaggerDocs())


    // middleware - не знайденої сторінки
    app.use(notFoundHandler)

    // middleware - помилок
    app.use(errorHandler)

    const PORT = Number(env("PORT", 3000))
    app.listen(PORT, () => console.log(`Server running on ${PORT} PORT`))
}