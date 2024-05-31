import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { findUser, updateUser } from '../../data/user';
import { ToastContainer, toast } from 'react-toastify';
import DeleteAccountPopUp from '../../Components/Layout/DeleteAccountPopUp/DeleteAccountPopUp';
import 'react-toastify/dist/ReactToastify.css';
import "./EditProfile.scss"

function EditProfile() {
    const navigate = useNavigate();

    const currUser = JSON.parse((localStorage.getItem("user")));

    const [showPopup, setShowPopup] = useState(false);

    //replace with a profile object -- instead -- better readability
    const [originalProfile, setOriginalProfile] = useState({});
    const [userProfile, setUserProfile] = useState({});

    const fetchProfile = () => {
        async function loadProfile() {
            const profile = await findUser(currUser);
            setOriginalProfile(profile);
            setUserProfile(profile)
        }

        loadProfile();
    };

    useEffect(() => {
        fetchProfile();
    }, []);


    const handleClick = () => {
        setShowPopup(true);
    };

    const resetChanges = () => {
        setUserProfile(originalProfile);
    };

    function handleFirstNameChange(e) {
        setUserProfile({...userProfile, first_name: e.target.value.replace(/\s/g, '')});
    }

    function handleLastNameChange(e) {
        setUserProfile({...userProfile, last_name: e.target.value.replace(/\s/g, '')});
    }

    //react toastify messages
    const profileChange = () => toast("Profile details changed!");
    const usernameChange = () => toast("Cannot change username");
    const emailChange = () => toast("Cannot change email");
    const cancelChanges = (e) => {
                                    e.preventDefault();
                                    resetChanges();
                                    toast("Profile changes canceled!");
    };
    
    const passwordNavigation = (e) => {
        e.preventDefault();
        navigate("/changepassword");
    };

    function handleAccountSaveChanges(e) {
        e.preventDefault();
        updateUser(currUser, userProfile.first_name, userProfile.last_name);
        profileChange();
    }

    return(
        <div className="edit-profile-container">
            <h1>Edit profile</h1>
            <form className="account-details-form" onSubmit={handleAccountSaveChanges}>
                <div className="username-group">
                    <input value={userProfile.username} onClick={usernameChange} readOnly></input>
                </div>
                <div className="name-container">
                    <input value={userProfile.first_name} onChange={handleFirstNameChange} placeholder='First name' required></input>
                    <input value={userProfile.last_name} onChange={handleLastNameChange} placeholder='Last name' required></input>
                </div>
                <div className="email-group">
                    <input type="email" value={userProfile.email} onClick={emailChange} readOnly></input>
                </div>
                <div className='form-buttons-container'>
                    <button className='cancelBtn' onClick={cancelChanges}>Cancel</button>
                    <button className='submitBtn' type="submit">Save Changes</button>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={true}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </div>
                <div className='account-changes-btns'>
                    <button className='password-btn' onClick={passwordNavigation}>Change password</button>
                    <button className='delete-btn' onClick={handleClick}>Delete Account</button>
                </div>
            </form>
            {showPopup && (
                <>
                    <div className="overlay" onClick={() => setShowPopup(false)}></div>
                    <DeleteAccountPopUp onClose={() => setShowPopup(false)}/>
                </>
            )}
        </div>
    );
}

export default EditProfile;