import "dotenv/config"
import { Router } from "express"
import { User } from "../../models/main.mjs"
import { where } from "sequelize"

const router = Router()

router.get("/profile", async (req, res, next) => {

    try {

        console.log(req.currentUser)

        const { currentUser } = req
        const { id } = currentUser

        const user = await User.findOne({
            where: { id: id }
        })

        if (!user) {
            return res.status(401).send({
                message: "unauthorized"
            })
        }

        res.send({
            message: "profile fetched",
            data: user
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