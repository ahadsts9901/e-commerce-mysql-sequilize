import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { IoMdCart } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

const _Card = ({ title, description, price, image, id }: any) => {

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
                    <Button size="small" sx={{ height: "2.5em" }} color='primary' variant='outlined'>
                        <IoMdCart style={{ color: "#364B63", fontSize: "1.5em", marginRight: "0.5em" }} />
                        Add To Cart
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default _Card