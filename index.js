import express from 'express';
import cors from "cors"
import pino from "pino-http"
import { contacts } from "./src/db/contacts.js"

const app = express();

app.use((req, res, next) => {
    console.log("first middleware");
    next()
})

app.get("/", (req, res) => {
    res.json([])
})

app.get('/products', (req, res) => {
    res.json([])
})

app.get("/contacts", (req, res) => {
    res.json(contacts)
})

app.listen(3000, () => console.log("Server running on 3000 port"))