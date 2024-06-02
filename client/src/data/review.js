import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

// --- Review ---------------------------------------------------------------------------------------
async function findProductReviews(product_id) {
    const reviews = await axios.get(API_HOST + `/api/reviews/product/${product_id}`);

    return reviews.data;
}

async function createReview(review) {
    const response = await axios.post(API_HOST + `/api/reviews`, review);

    return response.data;
}

async function deleteReview(id) {
    const response = await axios.delete(API_HOST + `/api/reviews/${id}`);
    return response.data;
}

async function deleteUserAllReviews(username) {
    const response = await axios.delete(API_HOST + `/api/reviews/user/${username}`);
    return response.data;
}

async function updateReview(id, text, rating) {
    const response = await axios.put(API_HOST + `/api/reviews/${id}`, { text, rating })
    return response.data;
}

async function findByReviewID(id) {
    console.log(id);
    const review = await axios.get(API_HOST + `/api/reviews/select/${id}`);

    return review.data;
}

export {
    findProductReviews, createReview, deleteUserAllReviews,
    deleteReview, findByReviewID, updateReview
}