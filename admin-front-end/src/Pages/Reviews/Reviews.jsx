import "./Reviews.scss";
import { getAllReviews } from "../../Queries";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import { useState, useEffect } from "react";

function Reviews() {
    const [reviews, setReviews] = useState([]);

    // Load Reviews
    useEffect(() => {
        async function loadReviews() {
            const reviewsLoaded = await getAllReviews();
            console.log(reviewsLoaded);
            setReviews(reviewsLoaded);
        }
        loadReviews();
    }, []);

    return(
        <div className="reviews-container">
            <h1>Reviews</h1>
            {reviews.map((item) => (
                <div key={item.review_id}>
                    <ReviewCard review={item} className="review-card" />
                    <br />
                </div>
            ))}
        </div>
    );
}

export default Reviews