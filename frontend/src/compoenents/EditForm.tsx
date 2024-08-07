import "./main.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { baseUrl } from "../core"
import { Button, TextField } from "@mui/material"
import AlertMUI from "../MUI/components/AlertMUI"

const EditForm = ({ id, setOpen, getProducts }: any) => {

    useEffect(() => {
        getProduct(id)
    }, [id])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [product, setProduct] = useState<any>(null)

    const [price, setPrice] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [successMessage, setSuccessMessage] = useState<null | string>(null)

    const getProduct = async (id: string | number) => {

        if (!id) return

        try {
            const resp = await axios.get(`${baseUrl}/api/v1/products/${id}`, { withCredentials: true })
            const productData = resp?.data?.data
            setProduct(productData)
            setPrice(productData?.price || 0)
            setTitle(productData?.title || "")
            setDescription(productData?.description || "")
        } catch (error) {
            console.error(error)
        }
    }

    const editProduct = async (e: any) => {

        e?.preventDefault()
        setErrorMessage(null)
        setSuccessMessage(null)

        if (!id) return

        if (!price || price < 1) {
            setErrorMessage("Price is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!title || title?.trim() === "") {
            setErrorMessage("Title is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!description || description?.trim() === "") {
            setErrorMessage("Description is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        try {

            setIsLoading(true)

            await axios.put(`${baseUrl}/api/v1/products/${id}`, {
                price,
                title,
                description,
            }, { withCredentials: true })

            setIsLoading(false)
            setSuccessMessage("Product updated successfully")
            setOpen(false)
            getProducts()
            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000)

        } catch (error: any) {
            console.error(error)
            setIsLoading(false)
            setErrorMessage(error?.response?.data?.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);
        }

    }

    return (
        <>
            {errorMessage && <AlertMUI status="error" text={errorMessage} />}
            {successMessage && <AlertMUI status="success" text={successMessage} />}
            <form onSubmit={editProduct} className="editForm">
                <div className="cont">
                    <img src={product?.imageUrl ? product?.imageUrl : ""} alt="product" style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: "12px"
                    }} />
                    <TextField required fullWidth label="Price" type="number"
                        value={price}
                        onChange={(e: any) => setPrice(Number(e?.target?.value))}
                    />
                </div>
                <TextField required fullWidth label="Title"
                    value={title}
                    onChange={(e: any) => setTitle(e?.target?.value)}
                />
                <TextField required fullWidth label="Description" multiline rows={6}
                    value={description}
                    onChange={(e: any) => setDescription(e?.target?.value)}
                />
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <Button type="submit" disabled={isLoading} color="primary" variant="contained"
                        sx={{ width: "12em", fontSize: "1em" }}
                    >Update</Button>
                </div>
            </form>
        </>
    )
}

export default EditForm