import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

async function createCart(username) {
  const response = await axios.post(API_HOST + "/api/carts", { username });
  if (response !== null) {
    setCart(username);
  }

  return response.data;
}

async function setCart(username) {
  const IDresponse = await axios.get(API_HOST + "/api/carts/");
    if (IDresponse.data !== null) {
      // Find the cartid that matches the username
      const userCart = IDresponse.data.find(cart => cart.username === username);
      if (userCart) {
        setCartID(userCart.cart_id);
      } 
    }
}

async function findCart(id) {
  const response = await axios.get(API_HOST + `/api/carts/select/${id}`);
  
    return response.data;
}

async function deleteCart(id) {
  const response = await axios.delete(API_HOST + `/api/carts/delete/${id}`);

    return response.data;
}

async function deleteCartItems(id) {
  const response = await axios.delete(API_HOST + `/api/carts/items/delete/${id}`);

    return response.data;
}

async function deleteItem(cart_id, product_id) {
  const response = await axios.delete(API_HOST + `/api/carts/items/delete/${cart_id}/${product_id}`);
}

async function createCartItem(detail) {
  const response = await axios.post(API_HOST + "/api/carts/items", detail);

  return response.data;
}

async function findCartItems(cart_id) {
  const response = await axios.get(API_HOST + `/api/carts/items/select/${cart_id}`);
  return response.data;
}

async function updateQuantity(detail) {
    const { cart_id, product_id, quantity } = detail;
    const response = await axios.put(API_HOST + `/api/carts/items/${cart_id}/${product_id}`, { quantity });
    return response.data;
}

// --- Helper functions to store cartID in user in localstorage --------------------------------------------
function setCartID(cartID) {
  localStorage.setItem("cartID", JSON.stringify(cartID));
}

function getCartID() {
  return JSON.parse(localStorage.getItem("cartID"));
}

function removeCartID() {
  localStorage.removeItem("cartID");
}


export {
  createCart, findCart, deleteCart, findCartItems, updateQuantity, deleteCartItems,
  setCart, setCartID, getCartID, removeCartID, createCartItem, deleteItem
}
