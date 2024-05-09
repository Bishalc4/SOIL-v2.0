import { Link } from 'react-router-dom'
import ProfileAvatar from "../../assets/ProfileAvatar.png"
import "./Profile.scss"

function Profile() {
    const currUser = JSON.parse((localStorage.getItem("user")));
    const users = localStorage.getItem("users");
    const usersArray = JSON.parse(users);
    let foundUser = null;
    for (const user of usersArray) {
        if (user.username === currUser) {
            foundUser = user;
            break;
        }
    }

    const dateJoined = new Date(foundUser.dateJoined);
    const joinDate = dateJoined.toISOString().split('T')[0];
    
    //signs user out by removing the user key
    const handleSignOut = () => {
        if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
        }
        localStorage.removeItem("showInputs")
    }

    return(
        <div className="profile-page-container">
            <h1 className="profile-user">{foundUser.username}&apos;s profile</h1>
            <div className="profile-information-container">
                <img src={ProfileAvatar} alt="Profile Avatar" className="profile-avatar"></img>
                <div className="profile-details-container">
                    <p className="profile-username"><b>{foundUser.username}</b></p>
                    <p className="names">{foundUser.firstName} {foundUser.lastName}</p>
                    <p className="email">{foundUser.email}</p>
                    <p className="username-join-date">Member since {joinDate}</p>
                    <div className="profile-page-btns">
                        <Link to="/editprofile">
                            <button className="edit-profile-btn">Edit Profile</button>
                        </Link>
                        <Link to="/">
                            <button className="edit-profile-btn" onClick={handleSignOut}>Sign Out</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile