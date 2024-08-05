import { Router } from "express"
import { Product } from "../../models/main.mjs"
import { upload, uploadOnCloudinary } from "../../functions.mjs"
import { where } from "sequelize"

const router = Router()

router.get("/products", async (req, res, next) => {

    try {

        const products = await Product.findAll({
            order: [['createdOn', 'DESC']]
        });

        res.send({
            message: "products fetched",
            data: products
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        });
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

    if (req?.files[0]?.size > (2 * 1024 * 1024)) {
        return res.status(400).send({
            message: "image too large please select under 2mb"
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

router.get("/products/:productId", async (req, res, next) => {

    const { productId } = req?.params

    if (!productId || productId?.trim() === "") {
        return res.status(400).send({
            message: "product id is required",
        });
    }

    try {

        const product = await Product.findOne({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).send({
                message: "product not found",
            });
        }

        res.send({
            message: "product fetched",
            data: product
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        });
    }


})

router.delete("/products/:productId", async (req, res, next) => {

    const { productId } = req?.params

    if (!productId || productId?.trim() === "") {
        return res.status(400).send({
            message: "product id is required",
        });
    }

    try {

        const deleteResponse = await Product.destroy({
            where: { id: productId }
        });

        if (!deleteResponse) {
            return res.status(404).send({
                message: "product not found",
            });
        }

        res.send({
            message: "product deleted",
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        });
    }


})

router.put("/products/:productId", async (req, res, next) => {

    const { productId } = req?.params
    const { title, description, price } = req?.body

    if (!productId || productId?.trim() === "") {
        return res.status(400).send({
            message: "product id is required",
        });
    }

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

    try {

        const updateResponse = await Product.update(
            {
                title: title,
                description: description,
                price: price
            },
            {
                where: { id: productId }
            }
        );

        if (!updateResponse) {
            return res.status(400).send({
                message: "product not found"
            })
        }

        res.send({
            message: "product updated",
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        });
    }


})

export default router