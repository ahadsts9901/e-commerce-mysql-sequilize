import "./main.css"
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from "@mui/material";
import { useState } from "react";
import AlertMUI from "../MUI/components/AlertMUI";
import { baseUrl } from "../core";
import axios from 'axios'
import { logout } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";

const Header = ({ items }: any) => {

    const currentUser = useSelector((state: any) => state?.user)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [clientErrorMessage, setClientErrorMessage] = useState<null | string>(null)
    const [alertData, setAlertdata] = useState<any>(null)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

    const dispatch = useDispatch()

    const _logout = async () => {

        try {

            setIsLoading(true)

            axios.post(`${baseUrl}/api/v1/logout`, {}, { withCredentials: true })

            setIsLoading(false)
            dispatch(logout())

        } catch (error: any) {
            setIsLoading(false)
            console.error(error)
            setClientErrorMessage(error?.response?.data?.message)
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 3000);
        }

    }

    return (
        <>
            {
                clientErrorMessage && <AlertMUI status="error" text={clientErrorMessage} />
            }
            <Alert
                open={isAlertOpen}
                setOpen={setIsAlertOpen}
                title={alertData?.title}
                description={alertData?.description}
                fun={alertData?.fun}
                isLoading={isLoading}
            />
            <div className="header">
                <h4>MySQL Store</h4>
                <>
                    <div className="right-area">
                        <>
                            {
                                !currentUser?.isAdmin ? <Badge badgeContent={items} color="error">
                                    <ShoppingCartOutlinedIcon color="action" sx={{ color: "#fff" }} />
                                </Badge> : null
                            }
                        </>
                        <>
                            <Button color="secondary" variant="outlined" disabled={isLoading} onClick={() => {
                                setAlertdata({
                                    title: "Logout?",
                                    description: "Are you sure you want to logout?. The action cannot be undone",
                                    fun: _logout,
                                })
                                setIsAlertOpen(true)
                            }}
                                sx={{ height: "2.5em" }}
                            >Logout</Button>
                        </>
                    </div>
                </>
            </div>
        </>
    )
}

export default Header