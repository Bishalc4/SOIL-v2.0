import { useState } from 'react';
import PropTypes from 'prop-types';
import AddToMealPopUp from "../AddToMealPopUp/AddToMealPopUp"
import "./AddMealBtn.scss"

//button that causes the trigger of the add to meal pop up
function AddMealBtn(props) {
  const [showPopup, setShowPopup] = useState(false);

  //trigger the display of the add to meak pop up
  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="add-meal-btn-container">
      <button onClick={handleClick}>Add to Planner</button>
      {showPopup && (
        <div>
          <div className="overlay" onClick={() => setShowPopup(false)}></div>
          <AddToMealPopUp onClose={() => setShowPopup(false)} id={props.id}/>
        </div>
      )}
    </div>
  );
}
AddMealBtn.propTypes = {
  id: PropTypes.string.isRequired
}

export default AddMealBtn
