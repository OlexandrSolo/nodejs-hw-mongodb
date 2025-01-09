import createHttpError from "http-errors";

export const authorization = async (req, res, next) => {
    const user = req.user;
    console.log(user);
    if (!user) {
        return next(createHttpError(401))
    }
    next()
}