import { useState, useEffect } from 'react';
import { BsCart3 } from "react-icons/bs";
import "./CartButton.scss";

function CartButton() {
  const [totalPrice, setTotalPrice] = useState(0);

  function getProductById(productId) {
    const productsList = JSON.parse(localStorage.getItem("products")) || [];
    return productsList.find(product => product.productId === productId);
  }

  useEffect(() => {
    const updateTotalPrice = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const user = JSON.parse(localStorage.getItem("user"));
      const userCart = cart.find(item => item.username === user);

      let total = 0;
      if (userCart) {
        userCart.data.forEach(item => {
          const product = getProductById(item.productId);
          if (product) {
            total += item.quantity * (product.specialPrice !== null ? product.specialPrice : product.price);
          }
        });
      }
      setTotalPrice(total);
    };

    updateTotalPrice(); 
    
    // Update total price whenever there's a change in cart of user data
    window.addEventListener('userDataUpdated', updateTotalPrice);

  }, []); 

  return (
    <div>
      <button className="cart-button">
        <div className="cart-button-content">
          <BsCart3 className="cart-icon" />
          <p className="cart-total">${totalPrice.toFixed(2)}</p>
        </div>
      </button>
    </div>
  );
}

export default CartButton;
