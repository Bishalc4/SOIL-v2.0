import { deleteReview } from "../../../data/review";
import "./ConfirmDeletePopUp.scss";

function ConfirmDeletePopUp({ onClose, id }) {

    const handleDelete = async () => {
        try {
            await deleteReview(id);
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