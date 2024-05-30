import { useState, useEffect } from 'react';
import { BsCart3 } from "react-icons/bs";
import { findAllProducts } from "../../data/product"
import { getCartID, findCartItems, } from '../../data/cart';
import "./CartButton.scss";

function CartButton() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const cartId = getCartID();

  useEffect(() => {
        async function fetchProductsAndCart() {
            try {
                const products = await findAllProducts();
                setProductsList(products);

                const userCart = await findCartItems(cartId);
                if (userCart) {
                    setCartData(userCart);
                }
            } catch (error) {
                console.error("Failed to fetch products or cart items:", error);
            }
        }

        fetchProductsAndCart();
    }, []);
  
  function getProductById(productId) {
        return productsList.find(product => product.product_id === productId); 
  }


  useEffect(() => {
    const updateTotalPrice = () => {
      let total = 0;
      if (cartData) {
        cartData.forEach(item => {
          const product = getProductById(item.product_id);
          if (product) {
                total += item.quantity * (product.special !== null ? product.special.special_price : product.price);
          }
        });
      }
      setTotalPrice(total);
    };

    updateTotalPrice(); 
    
    // Update total price whenever there's a change in cart of user data
    window.addEventListener('userDataUpdated', updateTotalPrice);

  }, [cartData]); 

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
