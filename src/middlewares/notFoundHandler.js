import createHttpError from "http-errors"

export const notFoundHandler = (req, res) => {
    // throw createHttpError(404, "Route not found")
    // throw createHttpError(404, `Route ${req.url} not found`);
    res.status(404).json({
        status: 404,
        messages: "Not Found"
    })
}