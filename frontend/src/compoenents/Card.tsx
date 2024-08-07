import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { IoMdCart } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

const DropMenu = ({ productId }: any) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = [
        { label: "Edit", icon: <ModeIcon sx={{ width: "0.8em", height: "0.8em", marginRight: "0.2em" }} />, fun: (id: string | number) => editProduct(id) },
        { label: "Delete", icon: <DeleteIcon sx={{ width: "0.8em", height: "0.8em", marginRight: "0.2em" }} />, fun: (id: string | number) => deleteProduct(id) },
    ]

    const deleteProduct = async (id: string | number) => {
        console.log("delete", id)
    }

    const editProduct = async (id: string | number) => {
        console.log("edit", id)
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options?.map((option: any, i: number) => (
                    <div key={i}>
                        <MenuItem key={option} onClick={() => {
                            handleClose()
                            option?.fun(productId)
                        }}>
                            {option.icon}
                            {option.label}
                        </MenuItem>
                    </div>
                ))}
            </Menu>
        </div>
    )

}

const _Card = ({ title, description, price, image, id }: any) => {

    const currentUser = useSelector((state: any) => state?.user)
    const navigate = useNavigate()

    return (
        <>
            <Card sx={{ width: "100%" }}>
                <CardMedia
                    sx={{ height: 160 }}
                    image={image}
                    title="product-image"
                />
                <CardContent sx={{ paddingBottom: 0 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", marginTop: "1em" }}>
                        $ {price.toLocaleString()}
                    </Typography>
                </CardContent>
                <CardActions sx={{ paddingBottom: "1.5em", flexWrap: "wrap", gap: "0.5em" }}>
                    <Button size="small" sx={{ height: "2.5em", marginLeft: "8px" }} color='primary' variant='contained'
                        onClick={() => navigate(`/product/${id}`)}
                    >
                        <MdArrowOutward style={{ color: "#fff", fontSize: "1.5em", marginRight: "0.5em" }} />
                        View More
                    </Button>
                    {
                        !currentUser?.isAdmin ?
                            <Button size="small" sx={{ height: "2.5em" }} color='primary' variant='outlined'>
                                <IoMdCart style={{ color: "#364B63", fontSize: "1.5em", marginRight: "0.5em" }} />
                                Add To Cart
                            </Button> :
                            <div className='drop-menu-parent'>
                                <DropMenu productId={id} />
                            </div>
                    }
                </CardActions>
            </Card>
        </>
    )
}

export default _Card