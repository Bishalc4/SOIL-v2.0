import { useState, useEffect } from 'react';
import { findAllSpecials } from '../../data/product';

import ProductCard from "../../Components/Layout/ProductCard/ProductCard";
import images from "../../assets";
import "./Specials.scss";

//Special deals page - displays products on sale
function Specials(){
    const [isLoading, setIsLoading] = useState(true);
    const [specials, setSpecials] = useState([]);

    const fetchSpecials = () => {
        async function loadTasks() {
            const specials = await findAllSpecials();

            setSpecials(specials);
            setIsLoading(false);
            console.log(specials);
        }

        loadTasks();
    };

    useEffect(() => {
        fetchSpecials();
    }, []);

    return(
        <div className="specials-container">
            <div className="products-grid-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    specials
                        .map((item, index) => (
                            <ProductCard key={index} product={item} image={images[item.imageUrl]} />
                        ))
                )}
            </div>
        </div>
    );
}

export default Specials;