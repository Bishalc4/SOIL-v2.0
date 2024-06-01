import React, { useContext } from "react";
import { deleteReview } from "../../../data/review";
import "./ConfirmDeletePopUp.scss";
import { ReviewsContext } from "../../../Pages/Product/Product.jsx";

function ConfirmDeletePopUp({ onClose, id }) {

    const updateParent = useContext(ReviewsContext);

    const handleDelete = async () => {
        try {
            await deleteReview(id);
            updateParent();
            onClose();
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    }

    return(
        <div className="delete-pop-up-container">
            <h2>Delete review</h2>
            <h4>Delete your review permanently?</h4>
            <div className="delete-btns">
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default ConfirmDeletePopUp