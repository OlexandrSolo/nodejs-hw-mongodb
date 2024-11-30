import createHttpError from "http-errors";

export const errorHandler = (error, req, res, next) => {
    if (error.isJoi) {
        return res.status(400).json({
            status: 400,
            messages: error.details.map(detail => detail.message)
        })
    }
    const { status = 500, messages = "Server error" } = error;
    res.status(status).json({
        status,
        messages,
    })
}