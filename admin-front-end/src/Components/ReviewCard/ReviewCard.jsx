import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import ProfileAvatar from "../../assets/ProfileAvatar.png"
import "./ReviewCard.scss"

function ReviewCard(props) {
    var date = props.review.updatedAt;
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10)
    date = day+"/"+month+"/"+year;
    
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

    //if currUser == username, also display a delete button and edit button
    //if updatetime !== createTime -> have "(edited)" next to the username

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
                <p className="review-date">{date}</p>
            </div>
        </div>
    );
}

export default ReviewCard