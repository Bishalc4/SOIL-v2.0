import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/LogoNoText.svg'
import './CartReceipt.scss';

function CartReceipt() {
    const location = useLocation();
    const { price , cartData, shippingAddress } = location.state;
    const user = JSON.parse(localStorage.getItem("user"));           // get current logged in user
    const cart = JSON.parse(localStorage.getItem("cart")) || [];    // get current cart

    const productsList = JSON.parse(localStorage.getItem("products"));  // get the list of products from local storage

    function getProductById (productId) {
        return productsList.find(product => product.productId === productId);    // get the product detail from productlist using the productId stored in cart
    }
    const updatedCart = cart.filter(item => item.username !== user);  // removing user cart from localstorage after successful purchase
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    return (
        <div className="receipt-container">
            <div className="header">
                <h1>Successful Purchase</h1>
                <img src={logo} alt="SOIL_Logo" className="logo"/>
            </div>
            <div className="shipping-details">
                <h2>SHIP TO</h2>
                <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                <p>{shippingAddress.addressLine}</p>
                <p>{shippingAddress.city}, {shippingAddress.state}</p>
                <p>{shippingAddress.postcode}, {shippingAddress.country}</p>
            </div>
            <div className="product-list">
                <div className="column-titles">
                    <p>QTY</p>
                    <p>Product Name</p>
                    <p>Price</p>
                </div>
                {cartData.map((item, index) => (
                    <div key={index} className="product-item">
                        <p>{item.quantity}</p>
                        <p>{getProductById(item.productId)?.productName}</p>
                        <p>${getProductById(item.productId)?.specialPrice !== null ? getProductById(item.productId)?.specialPrice.toFixed(2) 
                        : getProductById(item.productId)?.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="total">
                <p>Total: ${price.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default CartReceipt;
