import createHttpError from "http-errors";

export const errorHandler = (error, req, res, next) => {
    // throw createHttpError(500, "Something went wrong")
    const { status = 500, messages = "Server error" } = error;
    res.status(status).json({
        status,
        messages,
    })
}