export const errorHandler = (error, req, res, next) => {
    console.log(error);
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
        status,
        message,
    })
}