import createHttpError from "http-errors"

export const notFoundHandler = (req, res) => {
    res.status(404).json({
        status: 404,
        messages: "Not Found"
    })
}