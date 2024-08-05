import { Router } from "express"
import { emailPattern, firstNamePattern, lastNamePattern, passwordPattern } from "../../core.mjs"
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

router.post("/signup", async (req, res, next) => {

    const { firstName, lastName, email, password } = req?.body

    if (!firstName || firstName?.trim() === "") {
        return res.status(400).send({
            message: "firstName is required"
        })
    }

    if (!lastName || lastName?.trim() === "") {
        return res.status(400).send({
            message: "lastName is required"
        })
    }

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

    if (!firstNamePattern.test(firstName)) {
        return res.status(400).send({
            message: "firstname is invalid"
        })
    }

    if (!lastNamePattern.test(lastName)) {
        return res.status(400).send({
            message: "lastname is invalid"
        })
    }

    if (!emailPattern.test(email.toLowerCase())) {
        return res.status(400).send({
            message: "email is invalid"
        })
    }

    if (!passwordPattern.test(password)) {
        return res.status(400).send({
            message: "password must be alphanumeric and 8 to 24 characters long"
        })
    }

    try {

        const user = await User.findOne({
            where: { email: email }
        })

        if (user) {
            return res.status(400).send({
                message: "email already taken"
            })
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const signupResponse = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: passwordHash
        })

        console.log("signupResponse", signupResponse)

        const tokenUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            id: signupResponse?.id,
            isAdmin: false,
            createdOn: signupResponse?.createdOn,
        }

        await issueLoginToken(tokenUser, req)

        res.send({
            message: "signup successful",
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