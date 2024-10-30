import express from "express";
import cors from "cors";
import pino from "pino-http";


import { env } from "./utils/env.js";
import ContactCollection from "./db/models/contacts.js";

export const setupServer = () => {
    const app = express();
    app.use(cors());
    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    })
    // app.use(logger)

    app.get('/contacts', async (req, res) => {
        const data = await ContactCollection.find();

        res.json({
            status: 200,
            message: "Successfully find movies",
            data
        })
    })

    // middleware - не знайденої сторінки
    app.use((req, res) => {
        res.status(404).json({
            message: `${req.url} not found`
        })
    })

    // middleware - помилок
    app.use((req, res, next) => {
        res.status(500).json({
            message: error.message,
        })
    })

    const PORT = Number(env("PORT", 3000))
    app.listen(PORT, () => console.log(`Server running on ${PORT} PORT`))
}