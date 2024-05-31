import ProfileAvatar from "../../../assets/ProfileAvatar.png";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { findByReviewID, updateReview } from "../../../data/review";
import "./EditReviewPopUp.scss"

function EditReviewPopUp({ onClose, id }) {

    const text = "";
    const rating = 3;

    const [reviewText, setReviewText] = useState(text);
    const [reviewRating, setReviewRating] = useState(rating);

    const fetchReview = () => {
        async function loadReview() {
            const review = await findByReviewID(id);
            
            setReviewText(review.text);
            setReviewRating(review.rating);
        }

        loadReview();
    };

    useEffect(() => {
        fetchReview();
    }, []);

    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < reviewRating) {
            stars.push(<FaStar className="edit-star"/>);
        } else {
            stars.push(<FaRegStar className="edit-star"/>);
        }
    }

    function handleReviewInput(e) {
        setReviewText(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        updateReview(id, reviewText, reviewRating);
        onClose();
    }

    return(
        <div className="edit-review-pop-up-container">
            <div className="edit-pop-up-information">
                <div className="edit-review-stars">
                    {stars}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="edit-form">
                <textarea
                    className="edit-review-input"
                    value={reviewText}
                    onChange={handleReviewInput}
                />
                <div className="edit-btns">
                    <button onClick={onClose} >Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default EditReviewPopUp