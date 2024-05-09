import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import "./Header.scss"
import logo from "../../../assets/SOIL-logo.svg"
import ProfileButton from "../../../Pages/ProfileButton/ProfileButton.jsx"
import CartButton from "../../../Pages/CartButton/CartButton.jsx"
import SearchBtn from '../SearchBtn/SearchBtn.jsx'

function Header(props) {
    const isLoggedIn = props.isLoggedIn;
    const username = props.username;

    return(
        <>
            <header className="site-header">
                <Link to="/">
                    <img src={logo} alt="SOIL_Logo" className="logo"/>
                </Link>

                <SearchBtn />

                <div className="site-buttons">
                    {isLoggedIn ? (
                        <Link to="/profile">
                            <ProfileButton loggedIn={isLoggedIn} username={username}/>
                        </Link>
                    ): (
                        <Link to="/login">
                            <ProfileButton loggedIn={isLoggedIn} username={username}/>
                        </Link>
                    )}
                    <Link to="/cart">
                        <CartButton className="cart-button"/>
                    </Link>
                </div>
            </header>
        </>
    );
}
Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    username: PropTypes.string,
}

export default Header;