import * as authServices from "../services/auth.js"

const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session.id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    })
}

export const registerController = async (req, res) => {
    const data = await authServices.register(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully register user",
        name: data.name,
        email: data.email
    })
}

export const loginController = async (req, res) => {
    const session = await authServices.login(req.body)

    setupSession(res, session);

    res.json({
        status: 200,
        messages: "Successfully login user",
        date: {
            accessToken: session.accessToken
        }
    })
}

export const refreshTokenController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const session = await authServices.refreshToken({ refreshToken, sessionId });

    setupSession(res, session);

    res.json({
        status: 200,
        messages: "Successfully refresh token",
        date: {
            accessToken: session.accessToken
        }
    })
};

export const logoutController = async (req, res) => {
    if (req.cookies.sessionId) {
        await authServices.logout(req.cookies.sessionId)
    }

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");

    res.status(204).send()
}
