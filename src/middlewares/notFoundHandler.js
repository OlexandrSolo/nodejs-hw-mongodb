export const notFoundHandler = (req, res) => {
    throw createHttpError(404, "Route not found")
    // res.status(404).json({
    //     status: 404,
    //     messages: "Not Found"
    // })
}