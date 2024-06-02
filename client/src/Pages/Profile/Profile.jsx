import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { findUser, getUser } from '../../data/user';
import ProfileAvatar from "../../assets/ProfileAvatar.png"
import "./Profile.scss"

function Profile() {
    const currUser = getUser();

    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({});
    const [date, setDate] = useState("");

    const fetchProfile = () => {
        async function loadProfile() {
            const profile = await findUser(currUser);

            const year = profile.joinDate.substring(0, 4);
            const month = profile.joinDate.substring(5, 7);
            const day = profile.joinDate.substring(8, 10)
            setDate(day+"/"+month+"/"+year);

            setUserProfile(profile);
            setIsLoading(false);
        }

        loadProfile();
    };

    useEffect(() => {
        fetchProfile();
    }, []);
    
    //signs user out by removing the user key
     const handleSignOut = () => {
        if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
        }
        localStorage.removeItem("showInputs")
    }

    return(
        <div className='profile-page-container'>
            <h1 className="profile-user">{userProfile.username}&apos;s profile</h1>
            <div className="profile-information-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <img src={ProfileAvatar} alt="Profile Avatar" className="profile-avatar"/>
                        <div className='profile-details-container'>
                            <p className="profile-username"><b>{userProfile.username}</b></p>
                            <p className="names">{userProfile.first_name} {userProfile.last_name}</p>
                            <p className="email">{userProfile.email}</p>
                            <p className="username-join-date">Member since {date}</p>
                            <div className="profile-page-btns">
                                <Link to="/editprofile">
                                    <button className="edit-profile-btn">Edit Profile</button>
                                </Link>
                                <Link to="/">
                                    <button className="edit-profile-btn" onClick={handleSignOut}>Sign Out</button>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile