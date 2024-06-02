import ProductTable from "../../Components/ProductTable/ProductTable";
import { getProducts } from "../../Queries";
import "./Products.scss";
import { useState, useEffect } from "react";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const loadedProducts = await getProducts();
            setProducts(loadedProducts);
        }
        loadProducts();
    }, []);

    return(
        <div className="products-container">
            <h1>Browse Products</h1>
            <ProductTable products={products} />
        </div>
    );
}

export default Products