import { useState } from 'react';
import ProfileAvatar from "../../../assets/ProfileAvatar.png"
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { createReview } from '../../../data/review.js';
import "./ReviewForm.scss"

function ReviewForm({updateParentState, product_id}) {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);

    const [fixed, setFixed] = useState(false);

    //stores each star as either 'true' or 'false' depending on if it being hovered over
    const [stars, setStars] = useState(new Array(5).fill(false));

    //sets all of the elements from [0-index] to true
    const handleMouseEnter = (index) => {
        setFixed(false);

        var newHovered = [];
        for (let i = 0; i < 5; i++) {
            if (i <= index) {
                newHovered.push(true);
            } else {
                newHovered.push(false);
            }
        }

        setStars(newHovered);
        return newHovered;
    };
    
    //set the stars array back to its default (all 'false')
    const handleMouseLeave = () => {
        if (fixed === true) {
            return;
        }

        setStars(new Array(5).fill(false));
    };

    const handleMouseClick = (index) => {
        setRating(index+1);

        var tempStars = [];
        for (let i = 0; i < 5; i++) {
            if (i < index+1) {
                tempStars.push(true);
            } else {
                tempStars.push(false);
            }
        }

        setStars(tempStars);
        setFixed(true);
    }

    //renders the stars based on the "stars" useState variable
    const renderDivs = () => {
        const starContainer = [];

        for (let i = 0; i < 5; i++) {
            if (stars[i] === true) {
                starContainer.push(<FaStar key={i} className={`star hovered`} data-testid={`star-${i}`} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} onClick={() => handleMouseClick(i)} />)
            } else {
                starContainer.push(<FaRegStar key={i} className={`star`} data-testid={`star-${i}`} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} onClick={() => handleMouseClick(i)} />)
            }
        }
        return starContainer;
    };

    const currUser = JSON.parse((localStorage.getItem("user")));

    function handleReviewInput(e) {
        setReviewText(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newReview = { text: reviewText, rating: rating, username: currUser, product_id: product_id};
            await createReview(newReview);
            setReviewText("");
            updateParentState('Updated State from Child');
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
                        {renderDivs()}
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