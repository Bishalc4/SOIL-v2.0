import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../Components/Layout/ProductCard/ProductCard';
import images from "../../assets"
import "./Search.scss"

function Search() {
    const location = useLocation();
    const query = location.state.query.toLowerCase();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const storedProduct = JSON.parse(localStorage.getItem("products"));
        if (storedProduct) {
            setProduct(storedProduct);
        }
    }, []);

    return(
        <div className="search-container">
            <h1>Showing results for {query}...</h1>
            <div className="products-grid-container">
                {product
                    .filter(item => item.productName.toLowerCase().includes(query)) //if productName contains the query string
                    .map((item, index) => (
                    <ProductCard key={index} product={item} image={images[item.imageUrl]} />
                ))}
            </div>
        </div>
    );
}

export default Search