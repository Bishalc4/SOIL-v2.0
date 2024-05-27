import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

// --- Review ---------------------------------------------------------------------------------------
async function findProductReviews(product_id) {
    const reviews = await axios.get(API_HOST + `/api/reviews/product/${product_id}`);

    return reviews.data;
}


export {
    findProductReviews
}