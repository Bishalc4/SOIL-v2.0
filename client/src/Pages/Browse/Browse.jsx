import { useState, useEffect } from 'react';
import { findProductsByCategory } from '../../data/product';
import ProductCard from '../../Components/Layout/ProductCard/ProductCard';
import images from '../../assets';
import "./Browse.scss"

function Browse() {
    const [isLoading, setIsLoading] = useState(true);

    const [fruits, setFruits] = useState([]);
    const [vegetables, setVegetables] = useState([]);
    const [dairy, setDairy] = useState([]);
    const [meat, setMeat] = useState([]);
    const [grains, setGrains] = useState([]);

    const fetchProducts = () => {
        async function loadTasks() {
            const fetchedFruits = await findProductsByCategory('Fruits');
            const fetchedVegetables = await findProductsByCategory('Vegetables');
            const fetchedDairy = await findProductsByCategory('Dairy');
            const fetchedMeat = await findProductsByCategory('Meat');
            const fetchedGrains = await findProductsByCategory('Grains');

            setFruits(fetchedFruits);
            setVegetables(fetchedVegetables);
            setDairy(fetchedDairy);
            setMeat(fetchedMeat);
            setGrains(fetchedGrains);

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
                <h2>Fruits</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    fruits
                        .map((item, index) => (
                            <ProductCard key={index} product={item} image={images[item.imageUrl]} />
                        ))
                )}
                <h2>Vegetables</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    vegetables
                        .map((item, index) => (
                            <ProductCard key={index} product={item} image={images[item.imageUrl]} />
                        ))
                )}
                <h2>Dairy</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    dairy
                        .map((item, index) => (
                            <ProductCard key={index} product={item} image={images[item.imageUrl]} />
                        ))
                )}
                <h2>Meat</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    meat
                        .map((item, index) => (
                            <ProductCard key={index} product={item} image={images[item.imageUrl]} />
                        ))
                )}
                <h2>Grains</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    grains
                        .map((item, index) => (
                            <ProductCard key={index} product={item} image={images[item.imageUrl]} />
                        ))
                )}
            </div>
        </div>
    );
}

export default Browse