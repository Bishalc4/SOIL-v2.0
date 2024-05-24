import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

async function createCart(username) {
  const response = await axios.post(API_HOST + "/api/carts", { username });

  return response.data;
}

async function findCart(id) {
    const response = await axios.get(API_HOST + `/api/carts/select/${id}`);
  
    return response.data;
}

async function deleteCart(id) {
    const response = await axios.delete(API_HOST + `/api/carts/delete/${id}`);

    return response.data;
}


export {
  createCart, findCart, deleteCart
}
