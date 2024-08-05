import "./main.css"
import { IoMdCart } from "react-icons/io";

const SplashScreen = () => {
    return (
        <>
            <div className="splashScreen">
                <IoMdCart style={{ width: "10em", height: "10em" }} />
                <h3>Shopping</h3>
            </div>
        </>
    )
}

export default SplashScreen