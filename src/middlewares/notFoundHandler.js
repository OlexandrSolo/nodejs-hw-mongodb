import createHttpError from "http-errors"

export const notFoundHandler = (req, res) => {
<<<<<<< HEAD
    // throw createHttpError(404, "Route not found")
    res.status(404).json({
        status: 404,
        messages: "Not Found"
    })
=======
    throw createHttpError(404, `Route ${req.url} not found`);
>>>>>>> hw3-crud
}