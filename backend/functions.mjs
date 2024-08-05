import jwt from "jsonwebtoken"
import { initialSessionInDays } from "./core.mjs"

export const issueLoginToken = async (user, req) => {

    const hart = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: `${initialSessionInDays}d`
    });

    res.cookie('hart', hart, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + initialSessionInDays * 24 * 60 * 60 * 1000)
    });

}