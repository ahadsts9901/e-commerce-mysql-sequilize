import { Router } from "express"
import { Product } from "../../models/main.mjs"
import { upload, uploadOnCloudinary } from "../../functions.mjs"

const router = Router()

router.get("/products", async (req, res, next) => {

    try {

        const products = await Product.findAll()

        res.send({
            message: "products fetched",
            data: products
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

router.post("/products", upload.any(), async (req, res, next) => {

    const { title, description, price } = req?.body

    if (!title || title?.trim() === "") {
        return res.status(400).send({
            message: "title is required"
        })
    }

    if (!description || description?.trim() === "") {
        return res.status(400).send({
            message: "description is required"
        })
    }

    if (!price) {
        return res.status(400).send({
            message: "price is required"
        })
    }

    if (!req?.files || !req?.files?.length || !req?.files[0]) {
        return res.status(400).send({
            message: "image is required"
        })
    }

    try {

        const imageUrl = await uploadOnCloudinary(req?.files[0]?.path)

        const productResponse = await Product.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl
        })

        res.send({
            message: "product added successfully",
            data: productResponse?.dataValues
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