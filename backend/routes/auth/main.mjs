import { Router } from "express"
import { emailPattern, passwordPattern } from "../../core.mjs"
import { User } from "../../modules/main.mjs"
import { where } from "sequelize"
import bcrypt from "bcrypt"
import { issueLoginToken } from "../../functions.mjs"

const router = Router()

router.post("/login", async (req, res, next) => {

    const { email, password } = req?.body

    if (!email || email?.trim() === "") {
        return res.status(400).send({
            message: "email is required"
        })
    }

    if (!password || password?.trim() === "") {
        return res.status(400).send({
            message: "password is required"
        })
    }

    if (!emailPattern.test(email.toLowerCase()) || !passwordPattern.test(password)) {
        return res.status(400).send({
            message: "email or password incorrect"
        })
    }

    try {

        const user = await User.findOne({
            where: { email: email }
        })

        if (!user) {
            return res.status(400).send({
                message: "email or password incorrect"
            })
        }

        const isPasswordTrue = await bcrypt.compare(password, user?.password)

        if (!isPasswordTrue) {
            return res.status(400).send({
                message: "email or password incorrect"
            })
        }

        const tokenUser = {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            id: user?.id,
            isAdmin: user?.isAdmin,
            createdOn: user?.createdOn,
        }

        await issueLoginToken(tokenUser, req)

        res.send({
            message: "login successful",
            data: tokenUser
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

export default router