import "./Reviews.scss";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";

function Reviews() {
    const reviews = [
        {review_id: 3, text: "Loved this product!", username: "mbolger", rating: 5, updatedAt: "26/3/24"},
        {review_id: 4,text: "Loved this product!", username: "mbolger", rating: 5, updatedAt: "26/3/24"},
        {review_id: 5,text: "Loved this product!", username: "mbolger", rating: 5, updatedAt: "26/3/24"},
        {review_id: 6,text: "Loved this product!", username: "mbolger", rating: 5, updatedAt: "26/3/24"},
        {review_id: 8,text: "Loved this product!", username: "mbolger", rating: 5, updatedAt: "26/3/24"},
        {review_id: 9,text: "Loved this product!", username: "mbolger", rating: 5, updatedAt: "26/3/24"},
    ];
    const review = {
        text: "Loved this product!",
        username: "mbolger",
        rating: 5,
        updatedAt: "26/3/24"
    }

    return(
        <div className="reviews-container">
            <h1>Reviews</h1>
            <ReviewCard review={review} />
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