import "./ProfileButton.scss";
import PropTypes from 'prop-types'
import { IoPersonSharp } from "react-icons/io5";


function ProfileButton(props) {
    const loggedIn = props.loggedIn;
    const username = props.username; 

    return(
        <div className="profile-container">
            <button className="profile-button">
                <IoPersonSharp className="profile-icon"/>
            </button>
            <div className="profile-button-text">
                {loggedIn ? (
                    <>
                        <p className="profile-text">Welcome</p>
                        <p className="profile-my-profile"><b>{username}</b></p>
                    </>
                ): (
                    <>
                        <p className="profile-text">Log In or Sign Up</p>
                        <p className="profile-my-profile"><b>My Profile</b></p>
                    </>
                )}
                
            </div>
        </div>
    );
}
ProfileButton.propTypes = {
    loggedIn: PropTypes.bool,
    username: PropTypes.string,
}

export default ProfileButton;