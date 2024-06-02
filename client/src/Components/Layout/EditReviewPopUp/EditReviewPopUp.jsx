import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { findByReviewID, updateReview } from "../../../data/review";
import { ReviewsContext } from "../../../Pages/Product/Product";
import "./EditReviewPopUp.scss"

function EditReviewPopUp({ onClose, id }) {

    const text = "";
    const [rating, setRating] = useState(0);
    const [stars, setStars] = useState(new Array(5).fill(false));

    const [fixed, setFixed] = useState(false);

    const updateParent = useContext(ReviewsContext);

    const [reviewText, setReviewText] = useState(text);

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

    const fetchReview = () => {
        async function loadReview() {
            const review = await findByReviewID(id);
            
            setReviewText(review.text);
            setRating(review.rating);
        }

        loadReview();
    };

    useEffect(() => {
        fetchReview();
    }, []);

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

    function handleReviewInput(e) {
        setReviewText(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateReview(id, reviewText, rating);
        updateParent();
        onClose();
    }

    return(
        <div className="edit-review-pop-up-container">
            <div className="edit-pop-up-information">
                <div className="edit-review-stars">
                    {renderDivs()}
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