import createHttpError from "http-errors";

export const errorHandler = (error, req, res, next) => {
    const { status = 500, messages = "Server error" } = error;
    res.status(status).json({
        status,
        messages,
    })
}