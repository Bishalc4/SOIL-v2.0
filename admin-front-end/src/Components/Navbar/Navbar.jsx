import { GrUploadOption } from "react-icons/gr";
import "./Navbar.scss"

function Navbar() {
    return(
        <div className="navbar-container">
            <button className="create-product-button">
                <GrUploadOption className="upload-icon" />
                <span>Create product</span>
            </button>
            <div className="profile-icon">

            </div>
        </div>
    );
}

export default Navbar