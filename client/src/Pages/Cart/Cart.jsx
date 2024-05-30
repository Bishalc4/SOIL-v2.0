import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import images from "../../assets";
import emptyCart from "../../assets/EmptyCart.jpg"
import { findAllProducts } from "../../data/product"
import { getCartID, findCartItems, deleteItem, updateQuantity } from '../../data/cart';
import "./Cart.scss";

function Cart() {
    const navigate = useNavigate();
    
    const [price, setPrice] = useState(0);
    const [cartData, setCartData] = useState([]);
    const [productsList, setProductsList] = useState([]);

    const cartId = getCartID();

    useEffect(() => {
        async function fetchProductsAndCart() {
            try {
                const products = await findAllProducts();       // fetching all the products from the database
                setProductsList(products);

                const userCart = await findCartItems(cartId);   // fetching all the cart items for the logged in user
                if (userCart) {
                    setCartData(userCart);
                }
            } catch (error) {
                console.error("Failed to fetch products or cart items:", error);
            }
        }

        fetchProductsAndCart();
    }, [cartId]);

    function getProductById(productId) {
        return productsList.find(product => product.product_id === productId);        // finding a product info based on productid
    }

    useEffect(() => {
        handleTotalPrice();      // whenever cart changes, update the total price
    }, [cartData]);

    function handleTotalPrice() {
        let total = 0;
        cartData.forEach(item => {
            const product = getProductById(item.product_id);
            if (product) {
                total += item.quantity * (product.special !== null ? product.special.special_price : product.price);      // calculating the total price
            }
        });
        setPrice(total);
        window.dispatchEvent(new Event('userDataUpdated'));            // dispatching a event so cartbutton on the header can update
    }


    async function handleDelete(itemId) {      
        const updatedCartData = cartData.filter(item => item.product_id !== itemId);         // updating the state of the cartData when an item is deleted
        setCartData(updatedCartData);
        await deleteItem(cartId, itemId)
    }

    async function handleQuantityChange(productId, newQuantity) {
        if (newQuantity > 0) {
            await updateQuantity({ cart_id: cartId, product_id: productId, quantity: newQuantity });            // updating quantity in the backend

            const updatedCartData = cartData.map(item =>
                item.product_id === productId ? { ...item, quantity: newQuantity } : item
            );
            setCartData(updatedCartData);
        }
    }

    function handleSubmit() {
        navigate("/checkout", { state: { price, cartData } });        // when submitted go to checkout page
    }

    return (
        <>
        {cartData.length > 0 && (
            <div className='heading-title'>
                <h3>Product</h3>
                <h3>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Quantity</h3>
                <h3>Price &nbsp;&nbsp;Remove</h3>
            </div>
        )}
        {cartData.length > 0 && (
            <div className='cartPage-container'>
                {cartData.map((item, index) => (
                    <div key={index} className="cart-container">
                        <div className='cart-detail'>
                            <img src={images[getProductById(item.product_id)?.imageUrl]} alt={getProductById(item.product_id)?.product_name} />
                            <p>{getProductById(item.product_id)?.product_name}</p>
                        </div>
                        <div className="quantity-buttons">
                            <button onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}> - </button>
                            <button>{item.quantity}</button>
                            <button onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}> + </button>
                        </div>
                        <div className="price-and-delete">
                            <span>${getProductById(item.product_id)?.special !== null ? getProductById(item.product_id)?.special.special_price
                            : getProductById(item.product_id)?.price}</span>
                            <button onClick={() => handleDelete(item.product_id)}>Delete</button>
                        </div>
                    </div>
                ))}
                <div className='cartTotal'>
                    <span className='total-title'>Total Amount of your Cart</span>
                    <span className='total-amount'>${price.toFixed(2)}</span>
                </div>
                <div className='cartProceed'>
                    <button onClick={handleSubmit}>Proceed</button>
                </div>
            </div>
        )}
        {cartData.length === 0 && (
            <div className='empty-cart'>
                <p>Your shopping cart is empty.</p>
                <img src={emptyCart} alt="Empty Cart" />
                <button onClick={() => navigate("/specials")}>Continue shopping</button>
            </div>
        )}
        </>
    );
}

export default Cart;
