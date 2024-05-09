import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import images from "../../assets";
import emptyCart from "../../assets/EmptyCart.jpg"
import "./Cart.scss";

function Cart() {
    const navigate = useNavigate();

    const [price, setPrice] = useState(0);
    const [cartData, setCartData] = useState([]);

    const productsList = JSON.parse(localStorage.getItem("products"));  // get the list of products from localStorage
    const user = JSON.parse(localStorage.getItem("user"));   // get the logged in user

    // Retrieve cart data from local storage once
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const userCart = cart.find(item => item.username === user);
    useEffect(() => {
        if (userCart) {                                    // if the user has a cart, get the cart data (productId and Quantity)
            setCartData(userCart.data);
        }
    }, [user]);

    function getProductById(productId) {
        return productsList.find(product => product.productId === productId);    // get the product detail from productlist using the productId stored in cart
    }

    function handleTotalPrice() {                                              // handle the total amount of the cart
        let total = 0;
        cartData.forEach(item => {
            const product = getProductById(item.productId);
            if (product) {
                total += item.quantity * (product.specialPrice !== null ? product.specialPrice : product.price);
            }
        });
        setPrice(total);
        window.dispatchEvent(new Event('userDataUpdated'));
    }

    useEffect(() => {
        handleTotalPrice();
    }, [cartData]);

    function handleDelete(itemId) {      
        const updatedCartData = cartData.filter(item => item.productId !== itemId);
        setCartData(updatedCartData);
        const updatedCart = [...cart]; // Copy the cart array
        const userCartIndex = updatedCart.findIndex(cartItem => cartItem.username === user);
        if (userCartIndex >= 0) {
            updatedCart[userCartIndex].data = updatedCartData;
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    }

    function handleQuantityChange(productId, newQuantity) {
        if (newQuantity > 0) {
            const updatedCart = [...cart]; // Copy the cart array
            const userCartIndex = updatedCart.findIndex(cartItem => cartItem.username === user);
            if (userCartIndex !== -1) {
                const productToUpdate = updatedCart[userCartIndex].data.find(item => item.productId === productId);
                if (productToUpdate) {
                    productToUpdate.quantity = newQuantity;
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
            }
            const updatedCartData = cartData.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            );
            setCartData(updatedCartData);
        }
    }

    function handleSubmit() {
        navigate("/checkout", { state: { price, cartData } }); 
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
                            <img src={images[getProductById(item.productId)?.imageUrl]} alt={getProductById(item.productId)?.productName} />
                            <p>{getProductById(item.productId)?.productName}</p>
                        </div>
                        <div className="quantity-buttons">
                            <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}> - </button>
                            <button>{item.quantity}</button>
                            <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}> + </button>
                        </div>
                        <div className="price-and-delete">
                            <span>${getProductById(item.productId)?.specialPrice !== null ? getProductById(item.productId)?.specialPrice.toFixed(2) 
                            : getProductById(item.productId)?.price.toFixed(2)}</span>
                            <button onClick={() => handleDelete(item.productId)}>Delete</button>
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
