import { useState, useEffect } from 'react';
import ProductCard from "../../Components/Layout/ProductCard/ProductCard";
import images from "../../assets";
import "./Specials.scss";

//Special deals page - displays products on sale
function Specials(){
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const storedProduct = JSON.parse(localStorage.getItem("products"));
        if (storedProduct) {
            setProduct(storedProduct);
        }
    }, []);

    return(
        <div className="specials-container">
            <div className="products-grid-container">
                {product
                    .filter(item => item.specialPrice !== null) //if productName contains the query string
                    .map((item, index) => (
                    <ProductCard key={index} product={item} image={images[item.imageUrl]} />
                ))}
            </div>
        </div>
    );
}

export default Specials;