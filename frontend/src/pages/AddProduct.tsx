import "./main.css"
import Header from "../compoenents/Header"
import AntdUpload from "../compoenents/AntdUpload"
import { useRef, useState } from "react"
import { Button, TextField } from "@mui/material"
import AlertMUI from "../MUI/components/AlertMUI"
import axios from 'axios'
import { baseUrl } from "../core"
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom"

const AddProduct = () => {

    const uploadRef: any = useRef(null);

    const navigate = useNavigate()

    const [file, setFile] = useState<any>(null)
    const [price, setPrice] = useState<number>(0)
    const [title, setTitle] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [successMessage, setSuccessMessage] = useState<null | string>(null)

    const addProduct = async (e: any) => {

        e?.preventDefault()

        setErrorMessage(null)
        setSuccessMessage(null)

        if (!file) {
            setErrorMessage("Image is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

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

            const formData = new FormData()

            formData.append('title', title)
            formData.append('description', description)
            formData.append('price', `${price}`)
            formData.append('file', file)

            await axios.post(`${baseUrl}/api/v1/products`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            })

            e?.target?.reset()
            setFile(null)
            if (uploadRef.current) {
                uploadRef.current.reset();
            }

            setIsLoading(false)
            setSuccessMessage("Product added successfully")

        } catch (error: any) {
            console.error(error)
            setIsLoading(false)
            setErrorMessage(error?.response?.data?.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }

    }

    return (
        <>
            {errorMessage && <AlertMUI status="error" text={errorMessage} />}
            {successMessage && <AlertMUI status="success" text={successMessage} />}
            <Header items={3} />
            <>
                <h2 className="backToProds"
                    onClick={() => navigate("/admin/products")}
                ><MdArrowBackIos style={{
                    width: "1.5em",
                    height: "1.5em",
                }} /> <span>Go to products</span></h2>
                <form className="form" onSubmit={addProduct}>
                    <h3>Add Product</h3>
                    <div className="cont">
                        <AntdUpload setFile={setFile} ref={uploadRef} />
                        <TextField required fullWidth label="Price" type="number"
                            onChange={(e: any) => setPrice(e?.target?.value)}
                        />
                    </div>
                    <TextField required fullWidth label="Title"
                        onChange={(e: any) => setTitle(e?.target?.value)}
                    />
                    <TextField required fullWidth label="Description" multiline rows={6}
                        onChange={(e: any) => setDescription(e?.target?.value)}
                    />
                    <Button type="submit" disabled={isLoading} color="primary" variant="contained"
                        sx={{ width: "8em" }}
                    >Add</Button>
                </form>
            </>
        </>
    )
}

export default AddProduct