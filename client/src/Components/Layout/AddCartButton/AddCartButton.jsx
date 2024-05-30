import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { getUser } from "../../../data/user";
import { getCartID, findCartItems, createCartItem, updateQuantity } from "../../../data/cart";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCartButton({ productId }) {
    const navigate = useNavigate();

    async function handleClick() {
        const user = getUser();

        if (!user) {  // non logged in user cannot add to products to cart
            alert("To add to your cart, you'll need an account");
            navigate("/login");
            return;
        }

        const quantityCount = 1;
        const cartId = getCartID();    // get cart id of current loggedin user

        let userCart = await findCartItems(cartId);

        if (userCart) { // User has cart
            let productExist = false; 
            for (let item of userCart) {
                if (item.product_id === productId) {  // Check if product already exists
                    item.quantity += quantityCount; // Increment quantity if product exists
                    productExist = true;
                    await updateQuantity({ cart_id: cartId, product_id: productId, quantity: item.quantity });
                    break;
                }
            }

            if (!productExist) {
                await createCartItem({ cart_id: cartId, product_id: productId, quantity: quantityCount });     // if product does not exit in user cart, create item
            }
        } else { // User doesn't have items in the cart, add item
            await createCartItem({ cart_id: cartId, product_id: productId, quantity: quantityCount });
        }

        window.dispatchEvent(new Event('userDataUpdated'));           // dispatch new event for totalprice change
        toast.success("Product added to cart!");

    }

    return (
        <>
            <button onClick={handleClick}>Add to cart</button>
            <ToastContainer closeButton={false} style={{ marginTop: '150px' }} />
        </>
    );
}

AddCartButton.propTypes = {
    productId: PropTypes.number.isRequired,
};

export default AddCartButton;
