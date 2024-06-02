import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import ProfileAvatar from "../../assets/ProfileAvatar.png"
import { addDeletedReview } from "../../Queries";
import "./ReviewCard.scss"

function ReviewCard(props) {    
    const text = props.review.text;
    const username = props.review.username;

    const stars = [];
    const rating = props.review.rating;

    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<FaStar key={i} className="star"/>);
        } else {
            stars.push(<FaRegStar key={i} className="star"/>);
        }
    }

    const handleDelete = async (review_id) => {
        try {
            await addDeletedReview(review_id);
        } catch (error) {
            console.error("Failed to delete review ", error);
        }
    };

    return(
        <div className="review-card-container">
            <div className="profile-image-container">
                <img src={ProfileAvatar} alt="profile-avatar.png" className="profile-avatar"/>
            </div>
            <div className="review-information-container">
                <div className="star-rating-container">
                    {stars}
                </div>
                <div className="username-btns-container">
                    <h2>@{username}</h2>
                </div>
                <p>{text}</p>
                <button onClick={() => handleDelete(props.review.review_id)}>delete</button>
            </div>
        </div>
    );
}

export default ReviewCard