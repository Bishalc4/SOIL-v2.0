import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { BsCart4, BsGraphUpArrow } from "react-icons/bs";
import { GoCodeReview } from "react-icons/go";
import { LuUsers2 } from "react-icons/lu";
import "./Sidebar.scss"

function Sidebar() {
    return(
        <div className="sidebar-container">
            <div className="avatar-container">
                <div className='image-container'>

                </div>
                <span>Your name</span>
            </div>
            <ul>
                <li>
                    <Link to="/" className='sidebar-link'>
                        <MdOutlineDashboard className='sidebar-icon' />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/products" className='sidebar-link'>
                        <BsCart4 className='sidebar-icon' />
                        <span>Products</span>
                    </Link>
                </li>
                <li>
                    <Link to="/reviews" className='sidebar-link'>
                        <GoCodeReview className='sidebar-icon' />
                        <span>Reviews</span>
                    </Link>
                </li>
                <li>
                    <Link to="/customers" className='sidebar-link'>
                        <LuUsers2 className='sidebar-icon' />
                        <span>Customers</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar