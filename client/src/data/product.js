import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

// --- Product ---------------------------------------------------------------------------------------
async function findAllProducts() {
    const products = await axios.get(API_HOST + '/api/products');

    return products.data;
}

async function findProduct(productID) {
    const product = await axios.get(API_HOST + `/api/products/select/${productID}`);

    return product.data;
}

async function findAllSpecials() {
    const specials = await axios.get(API_HOST + '/api/products/specials');

    return specials.data;
}

async function findProductsByCategory(category) {
    const products = await axios.get(API_HOST + `/api/products/category/${category}`);

    return products.data;
}

async function findSpecialsByCategory(category) {
    const products = await axios.get(API_HOST + `/api/products/category/${category}/specials`);

    return products.data;
}

export {
    findAllProducts, findProduct, findAllSpecials,
    findProductsByCategory, findSpecialsByCategory
}