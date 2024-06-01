import { useNavigate } from 'react-router-dom'
import { getUser, removeUser, deleteUser } from '../../../data/user';
import { getCartID, removeCartID, deleteCart, deleteCartItems } from '../../../data/cart';
import {  deleteUserAllReviews } from '../../../data/review';
import "./DeleteAccountPopUp.scss"

// eslint-disable-next-line react/prop-types
function DeleteAccountPopUp({onClose}) {
    const navigate = useNavigate();

    //gets each key from the local storage and removes the currUser from it
    //this is important as our local storage is able to handle multiple users and is not limited to one user
    async function deleteAccount() {
        const user = getUser();
        const cartID = getCartID();

        const macros = JSON.parse(localStorage.getItem("macros")) || [];
        const updateMacros = macros.filter(item => item.username !== user);
        localStorage.setItem("macros", JSON.stringify(updateMacros));

        const meals = JSON.parse(localStorage.getItem("meals")) || [];
        const updateMeals = meals.filter(item => item.username !== user);
        localStorage.setItem("meals", JSON.stringify(updateMeals));

        const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
        const updateProfiles = profiles.filter(item => item.username !== user);
        localStorage.setItem("profiles", JSON.stringify(updateProfiles));         // updating the personalised profile (hd assignment1)

        await deleteCartItems(cartID);
        await deleteCart(cartID);
        await deleteUserAllReviews(user);
        await deleteUser(user);

        removeUser();
        removeCartID();
        localStorage.removeItem("showInputs")

        navigate("/");
    }

    function close() {
        onClose();
    }

    return(
        <div className="delete-account-container">
            <h1>Are you sure?</h1>
            <h3>Pressing &apos;Yes&apos; will permanently delete your account</h3>
            <div className="delete-account-btns">
                <button onClick={close}>No</button>
                <button onClick={deleteAccount}>Yes</button>
            </div>
        </div>
    );
}

export default DeleteAccountPopUp