import { useLocation } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { findProductReviews } from '../../data/review';
import { getUser, blockList } from '../../data/user';
import ReviewForm from '../../Components/Layout/ReviewForm/ReviewForm';
import ReviewCard from '../../Components/Layout/ReviewCard/ReviewCard';
import AddCartButton from '../../Components/Layout/AddCartButton/AddCartButton';
import "./Product.scss"

export const ReviewsContext = createContext();

function Product() {
    const location = useLocation();
    const [isBlocked, setIsBlocked] = useState(false); 

    useEffect(() => {
        async function fetchData() {
            const blocklist = await blockList();
            const user = await getUser();
            const blocked = blocklist.find(item => item.username === user);
            setIsBlocked(blocked);
        }
        fetchData();
    }, []);

    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [average, setAverage] = useState(0);
    const [parentState, setParentState] = useState('initial state');

    const updateParentState = (newState) => {
        fetchReviews();
      };    

    const fetchReviews = () => {
        async function loadReview() {
            const fetchedReviews = await findProductReviews(location.state.product.product_id);
            
            setReviews(fetchedReviews);
            setIsLoading(false);
            reviewAverage(fetchedReviews);
        }

        loadReview();
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const reviewAverage = (reviews) => {
        if (reviews.length === 0) {
            setAverage(0);
            return; //return early if the review length is 0 (can't divide by 0)
        }

        //calculate the total number of "stars"  = the total rating for all reviews
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        //divide by the actual number of reviews (taking the average)
        const averageRating = totalRating/reviews.length
        setAverage(averageRating.toFixed(1));
    }

    const productImage = location.state.productImage;
    const productName = location.state.product.product_name;
    const productPrice = parseFloat(location.state.product.price).toFixed(2);

    var productSpecialPrice = null;

    if (location.state.product.special !== null) {
        productSpecialPrice = location.state.product.special.special_price;
    }

    if (productSpecialPrice !== null) {
        productSpecialPrice = parseFloat(productSpecialPrice).toFixed(2);
    }
    
    const productSavedPrice = parseFloat(productPrice - productSpecialPrice).toFixed(2);

    return(
        <div className="product-container">
            <div className="row">
                <img src={productImage} alt="Product Image" className="product-image"></img>
                <div className="product-details-container">
                    {productSpecialPrice !== null ? (
                        <div className="special-save-container">
                            <h1>SAVE ${productSavedPrice}</h1>
                        </div>
                    ): (
                        <>
                        </>
                    )}
                    <div className={`product-information-container ${productSpecialPrice !== null ? 'special' : 'original'}`}>
                        <h1>{productName}</h1>
                        {productSpecialPrice !== null ? (
                            <>
                                <h1>${productSpecialPrice}</h1>
                                <h2 className="product-special-price">Was ${productPrice}</h2>
                            </>
                        ): (
                            <>
                                <h1>${productPrice}</h1>
                            </>
                        )}
                        <AddCartButton productId={location.state.product.product_id} className={`add-to-cart-btn ${productSpecialPrice !== null ? 'special' : 'original'}`} />
                    </div>
                </div>
            </div>
            <div className="ratings-review-container">
                <div className='row'>
                    <h1>Reviews ({reviews.length})</h1>
                    <h2>Average Rating: {average}</h2>
                </div>
                <div className='row'>
                    {!isBlocked && (
                    <ReviewForm className="review-container" updateParentState={updateParentState} product_id={location.state.product.product_id}/>
                    )}
                </div>
                <div className='row'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <ReviewsContext.Provider value={updateParentState}>
                            {reviews.map((item) => (
                                <div key={item.review_id}>
                                    <ReviewCard review={item} className="review-card" />
                                    <br />
                                </div>
                            ))}
                        </ReviewsContext.Provider>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Product