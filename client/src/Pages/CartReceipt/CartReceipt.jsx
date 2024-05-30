import {useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { findAllProducts } from "../../data/product"
import { getCartID, deleteCartItems } from '../../data/cart';
import logo from '../../assets/LogoNoText.svg'
import './CartReceipt.scss';

function CartReceipt() {
    const location = useLocation();
    const { price, cartData, shippingAddress } = location.state;
    const cartID = getCartID();

    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        async function fetchProductsAndDeleteCart() {
            const products = await findAllProducts();       // fetching all the products from the database
            setProductsList(products);
            await deleteCartItems(cartID);                // deleting all the cart items for the logged in user after successful purchase
        }

        fetchProductsAndDeleteCart();
    }, [cartID]);

    function getProductById(productId) {
        return productsList.find(product => product.product_id === productId);   // finding a product info based on productid
    }

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
                        <p>{getProductById(item.product_id)?.product_name}</p>
                        <p>${getProductById(item.product_id)?.special !== null ? getProductById(item.product_id)?.special.special_price
                            : getProductById(item.product_id)?.price}</p>
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
