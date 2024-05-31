import ProfileAvatar from "../../../assets/ProfileAvatar.png";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { ImBin } from "react-icons/im";
import ConfirmDeletePopUp from "../ConfirmDeletePopUp/ConfirmDeletePopUp";
import EditReviewPopUp from "../EditReviewPopUp/EditReviewPopUp";
import "./ReviewCard.scss"
import { useState } from 'react';

function ReviewCard(props) {
    const [showDeletePopup, setShowDeletePopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);

    const handleDeleteBtnClick = () => {
        setShowDeletePopUp(true);
    };

    const handleEditBtnClick = () => {
        setShowEditPopUp(true);
    }

    var date = props.review.updatedAt;
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10)
    date = day+"/"+month+"/"+year;

    const currUser = JSON.parse((localStorage.getItem("user")));
    
    const text = props.review.text;
    const username = props.review.username;username

    const stars = [];
    const rating = props.review.rating;

    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<FaStar className="star"/>);
        } else {
            stars.push(<FaRegStar className="star"/>);
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
                    {currUser === username ? (
                        <>
                            <div className="edit-delete-container">
                                <button id="editBtn" onClick={handleEditBtnClick}>
                                    <div className="edit-container">
                                        <MdOutlineModeEdit />
                                        <span>Edit</span>
                                    </div>
                                </button>
                                <button id="deleteBtn" onClick={handleDeleteBtnClick}>
                                    <div className="delete-container">
                                        <ImBin className="bin-icon"/>
                                        <span>Delete</span>
                                    </div>
                                </button>
                            </div>
                        </>
                        ): ( <></> )
                    }
                </div>
                <p>{text}</p>
                <p className="review-date">{date}</p>
            </div>
            {showDeletePopup && (
                <div>
                    <div className="review-overlay" onClick={() => setShowDeletePopUp(false)}></div>
                    <ConfirmDeletePopUp onClose={() => setShowDeletePopUp(false)} id={props.review.review_id}/>
                </div>
            )}
            {showEditPopUp && (
                <div>
                    <div className="review-overlay" onClick={() => setShowEditPopUp(false)}></div>
                    <EditReviewPopUp onClose={() => setShowEditPopUp(false)} id={props.review.review_id}/>
                </div>
            )}
        </div>
    );
}

export default ReviewCard