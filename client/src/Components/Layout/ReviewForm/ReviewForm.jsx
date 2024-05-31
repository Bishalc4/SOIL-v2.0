import { useState, useEffect } from 'react';
import ProfileAvatar from "../../../assets/ProfileAvatar.png"
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { createReview } from '../../../data/review.js';
import "./ReviewForm.scss"

function ReviewForm({product_id}) {
    const [reviewText, setReviewText] = useState("");

    const currUser = JSON.parse((localStorage.getItem("user")));

    const rating = 4;
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<FaStar className="star"/>);
        } else {
            stars.push(<FaRegStar className="star"/>);
        }
    }

    function handleReviewInput(e) {
        setReviewText(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newReview = { text: reviewText, rating: rating, username: currUser, product_id: product_id};
            await createReview(newReview);
            setReviewText("");
        } catch (error) {
            console.error("Error posting review:", error);
        }
    }

    return (
            <div className="review-form-container">
                <div className="profile-image-container">
                    <img src={ProfileAvatar} alt="profile-avatar.png" className="profile-avatar"/>
                </div>
                <div className="review-input-container">
                    <h2>@{currUser}</h2>
                    <div id="posting-publicly-container">
                        <h4>Posting publicly</h4>
                        <HiInformationCircle id="information-icon"/>
                    </div>
                    <div className="star-rating-container">
                        {stars}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="review-input"
                            placeholder="Share your thoughts about this product here..."
                            value={reviewText}
                            onChange={handleReviewInput}
                            rows="4"
                        />
                        <div className="review-buttons-container">
                            <button id="post-btn" type="submit">Post</button>
                        </div>
                    </form>
                </div>
            
            </div>
    );
}

export default ReviewForm;