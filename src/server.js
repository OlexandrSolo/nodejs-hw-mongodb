import express from "express";
import cors from "cors";

import { env } from "./utils/env.js";
import contactsRouter from "./routers/routers.js"

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    // app.use(logger)

    app.use('/contacts', contactsRouter)

    app.use('/contacts/:contactId', contactsRouter)

    // middleware - не знайденої сторінки
    app.use(notFoundHandler)

    // middleware - помилок
    app.use(errorHandler)

    const PORT = Number(env("PORT", 3000))
    app.listen(PORT, () => console.log(`Server running on ${PORT} PORT`))
}