import "./main.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../core"
import { Button, CircularProgress } from "@mui/material"
import Header from "../compoenents/Header"
import { IoIosArrowBack, IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux"
import { DropMenu } from "../compoenents/Card"
import Alert from "../compoenents/Alert"

const SingleProduct = () => {

    const { productId } = useParams()

    const currentUser = useSelector((state: any) => state?.user)

    const [product, setProduct] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [alertData, setAlertdata] = useState<any>(null)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {

        if (!productId) return

        try {

            setIsLoading(true)

            const resp = await axios.get(`${baseUrl}/api/v1/products/${productId}`, { withCredentials: true })
            setProduct(resp?.data?.data)

            setIsLoading(false)

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }

    }

    return (
        <>
            <Header items={13} />
            <div className="back-button"
                onClick={() => window.history.back()}
            >
                <IoIosArrowBack style={{ color: "#454545", fontSize: "2.5em" }} />
                <h2 style={{ paddingTop: "0.2em" }}>Go Back</h2>
            </div>
            <Alert
                open={isAlertOpen}
                setOpen={setIsAlertOpen}
                title={alertData?.title}
                description={alertData?.description}
                fun={alertData?.fun}
                isLoading={isLoading}
            />
            {
                isLoading ?
                    <>
                        <div className="loadCont"><CircularProgress size={40} color="primary" /></div>
                    </> :
                    !product ? <><div className="loadCont"><h2 className="heading-load">Product Not Found...</h2></div></> :
                        <>
                            <div className="product-single">
                                <img src={product?.imageUrl} alt="product" />
                                {
                                    currentUser?.isAdmin ?
                                        <div className='drop-menu-parent'>
                                            <DropMenu productId={productId} setAlertdata={setAlertdata} setIsLoading={setIsLoading} setIsAlertOpen={setIsAlertOpen} getProducts={() => { }} />
                                        </div>
                                        :
                                        null
                                }
                                <>
                                    <div className="product-data">
                                        <h1>{product?.title}</h1>
                                        <p>{product?.description}</p>
                                        <h4>$ {product?.price?.toLocaleString()}</h4>
                                        {
                                            !currentUser?.isAdmin ?
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    sx={{ marginTop: "auto" }}
                                                ><IoMdCart style={{ color: "#fff", fontSize: "1.5em", marginRight: "0.5em" }} />Add To Cart</Button>
                                                : null
                                        }
                                    </div>
                                </>
                            </div>
                        </>
            }
        </>
    )
}

export default SingleProduct