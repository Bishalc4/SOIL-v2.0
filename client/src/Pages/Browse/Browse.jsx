import { useState, useEffect } from 'react';
import { findAllProducts } from '../../data/product';
import ProductCard from '../../Components/Layout/ProductCard/ProductCard';
import images from '../../assets';
import "./Browse.scss"

function Browse() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        async function loadTasks() {
            const fetchedProducts = await findAllProducts();

            setProducts(fetchedProducts);
            setIsLoading(false);
        }

        loadTasks();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return(
        <div className="browse-container">
            <h1>Browse products by category</h1>
            <div className="products-grid-container">
               {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    products
                        .map((item, index) => (
                            <ProductCard key={index} product={item} image={images[item.imageUrl]} />
                        ))
                )}
            </div>
        </div>
    );
}

export default Browse