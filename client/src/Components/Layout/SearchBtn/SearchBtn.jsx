import "./SearchBtn.scss";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

function SearchBtn(){

    const [inputValue, setInputValue] = useState('');

    function handleInputValueChange(e) {
        setInputValue(e.target.value)
    }

    return(
        <div className="search-box">
            <input type="text" placeholder="Search..." value={inputValue} onChange={handleInputValueChange} required/>
            <Link to="/search" state={{query: inputValue}}>
                <IoSearch className="search-icon"/>
            </Link>
        </div>
    );
}

export default SearchBtn;