import "./main.css"
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Header = ({ items }: any) => {
    return (
        <div className="header">
            <h4>MySQL Store</h4>
            <>
                <Badge badgeContent={items} color="error">
                    <ShoppingCartOutlinedIcon color="action" sx={{ color: "#fff" }} />
                </Badge>
            </>
        </div>
    )
}

export default Header