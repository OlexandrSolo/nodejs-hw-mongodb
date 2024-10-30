import express from "express";
import cors from "cors";
import pino from "pino-http";

export const startServer = () => {
    const app = express();
    app.use(cors());
    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    })
    // app.use(logger)

    app.get('/', (req, res) => {
        res.json({
            message: "Start Project"
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

    app.listen(3000, () => console.log("Server running on 3000 port"))
}