import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import ArrowIcon from '../../../assets/Subscribe-submit.svg'
import "./Footer.scss";

function Footer() {
  return (
    <footer className='footer-container'>
        <div className="about-links-container" id="footer-column">
            <h4>About SOIL</h4>
            <Link to="/about">
              <p>About us</p>
            </Link>
            <Link to="/browse">
              <p>Organic Products</p>
            </Link>
            <Link to="specials">
              <p>Special Weeks</p>
            </Link>
        </div>

        <div className="help-column" id="footer-column">
            <h4>Help</h4>
            <Link to="/dietnutrition">
              <p>Meal Planner</p>
            </Link>
            <Link to="/cart">
              <p>Cart</p>
            </Link>
            <Link to="/growityourself">
              <p>Vegetabel Farming</p>
            </Link>
        </div>

        <div className="helpful-link-column" id="footer-column">
            <h4>Helpful Links</h4>
            <Link to="/editprofile">
              <p>Edit Profile</p>
            </Link>
            <Link to="/login">
              <p>Login</p>
            </Link>
            <Link to="/signup">
              <p>SignUp</p>
            </Link>
        </div>

        <div className="subscribe-container">
          <h4>Subscribe</h4>
          <div className='form-submit'>
            <input type="email" placeholder="Email address" name="subscription-email" required />
            <button type="submit" className="submit-button">
                <img src={ArrowIcon} alt="Submit" />
            </button>
          </div>
          <p>
            Hello, we are SOIL. Our goal is to foster a sustainable food
            ecosystem that values quality produce and promotes environmental
            stewardship for all.
          </p>
          <div className="social-media-container">
            <a href="https://www.facebook.com">
              <div id="logo-container">
                <FaFacebook id="social-media-logo" />
              </div>
            </a>
            <a href="https://www.twitter.com">
              <div id="logo-container">
                <FaSquareXTwitter id="social-media-logo" />
              </div>
            </a>
            <a href="https://www.instagram.com">
              <div id="logo-container">
                <AiFillInstagram id="social-media-logo" />
              </div>
            </a>
            <a href="https://www.youtube.com">
              <div id="logo-container">
                <FaYoutube id="social-media-logo" />
              </div>
            </a>
          </div>
        </div>
    </footer>
  );
}

export default Footer;

