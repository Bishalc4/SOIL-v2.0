import { useNavigate} from "react-router-dom";
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AddCartButton ( {productId} ) {
    const navigate = useNavigate();

    function handleClick() {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("To add to your cart, you'll need an account");
            navigate("/login");
        }

        else {
            const quantityCount = 1;

            let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

            const userCart = existingCart.find(item => item.username === user);

            if (userCart) {                                                // User exists in the cart
                let productExist = false;                                  // check if product already exist 

                for (let i = 0; i < userCart.data.length; i++) {
                    if (userCart.data[i].productId === productId) {        // increment the quantity if product exist in user cart
                        userCart.data[i].quantity += quantityCount;
                        productExist = true;
                        break;
                    }
                }

                if (!productExist) {
                    userCart.data = [...userCart.data, { productId: productId, quantity: quantityCount }];
                }
            } 

            else {
                existingCart = [...existingCart, {username: user, data: [{ productId: productId, quantity: quantityCount }]}]; // User doesn't exist in the cart, add a new user cart
            }

            localStorage.setItem("cart", JSON.stringify(existingCart));
            window.dispatchEvent(new Event('userDataUpdated'));
            toast.success("Product added to cart!");
        }
    }

    return (
        <>
            <button onClick={handleClick}>Add to cart</button>
            <ToastContainer  closeButton={false} style={{ marginTop: '150px' }}/>
        </>
    );
}
AddCartButton.propTypes = {
    productId: PropTypes.number
}

export default AddCartButton