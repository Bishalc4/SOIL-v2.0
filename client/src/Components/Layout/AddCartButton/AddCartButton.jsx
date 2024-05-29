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

        if (!user) {
            alert("To add to your cart, you'll need an account");
            navigate("/login");
            return;
        }

        const quantityCount = 1;
        const cartId = getCartID();

         let userCart = await findCartItems(cartId);

        if (userCart) { // User has cart
            let productExist = false; // Check if product already exists
            for (let item of userCart) {
                if (item.product_id === productId) { // Increment quantity if product exists
                    item.quantity += quantityCount;
                    productExist = true;
                    await updateQuantity({ cart_id: cartId, product_id: productId, quantity: item.quantity });
                    break;
                }
            }

            if (!productExist) {
                await createCartItem({ cart_id: cartId, product_id: productId, quantity: quantityCount });
            }
        } else { // User doesn't have items in the cart, add item
            await createCartItem({ cart_id: cartId, product_id: productId, quantity: quantityCount });
        }

        window.dispatchEvent(new Event('userDataUpdated'));
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
