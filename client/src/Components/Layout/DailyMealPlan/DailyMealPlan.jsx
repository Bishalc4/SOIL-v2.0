// import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import "./DailyMealPlan.scss"
import MealCard from '../MealCard/MealCard';

//this is the content of each day in the meal plan (e.g. sunday -> sunday heading and associated meals)
function DailyMealPlan(props) {
    const day = props.day;

    //get current user and meals from local storage
    const currUser = JSON.parse(localStorage.getItem("user") || 'null');
    var mealsArray = JSON.parse(localStorage.getItem("meals") || '[]');

    //retrieve the meals for the day
    const userIndex = mealsArray.findIndex(user => user.username === currUser);
    const meals = mealsArray[userIndex].diet[day];

    return(
        <div className='day-container'>
            <h1>{day}</h1>
            <div className='day-content'>
                {Object.entries(meals).map(([mealName, mealValue]) => (
                    mealValue && <MealCard key={mealName} recipe={mealValue} meal={mealName} day={day}/>
                ))}
            </div>
        </div>
    );
}
DailyMealPlan.propTypes = {
    day: PropTypes.string.isRequired,
}

export default DailyMealPlan