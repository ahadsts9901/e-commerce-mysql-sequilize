import "./main.css"
import { useEffect, useState } from "react"
import Header from "../compoenents/Header"
import axios from 'axios'
import { baseUrl } from "../core"
import { Button, CircularProgress } from "@mui/material"
import Card from "../compoenents/Card"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IoIosAddCircle } from "react-icons/io";

const Products = () => {

    const [products, setProducts] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const currentUser = useSelector((state: any) => state?.user)
    const navigate = useNavigate()

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {

        try {

            setIsLoading(true)

            const resp = await axios.get(`${baseUrl}/api/v1/products`, {
                withCredentials: true
            })

            setProducts(resp?.data?.data)
            setIsLoading(false)

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }

    }

    return (
        <>
            <Header items={350} />
            {
                currentUser?.isAdmin ?
                    <div className="buttonContAdd">
                        <Button onClick={() => navigate("/admin/add-product")}
                            variant="contained" color="primary"
                        ><IoIosAddCircle style={{ width: "1.2em", height: "1.2em",marginTop: "-0.2em" }} />Add Product</Button>
                    </div>
                    : null
            }
            {
                isLoading ?
                    <>
                        <div className="loadCont"><CircularProgress size={40} color="primary" /></div>
                    </> :
                    !products?.length ? <><div className="loadCont"><h2 className="heading-load">No Product Found...</h2></div></> :
                        <>
                            <div className="products">
                                {
                                    products?.map((product: any, i: number) => (
                                        <Card
                                            key={i}
                                            title={product?.title}
                                            description={product?.description}
                                            price={product?.price}
                                            image={product?.imageUrl}
                                            id={product?.id}
                                        />
                                    ))
                                }
                            </div>
                        </>
            }
        </>
    )
}

export default Products