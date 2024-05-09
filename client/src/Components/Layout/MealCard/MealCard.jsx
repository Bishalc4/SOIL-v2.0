import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import "./MealCard.scss"

function MealCard({recipe, meal, day}) {
    const [recipeData, setRecipeData] = useState({});

    // const mealDay = day; //Monday
    // const mealMeal = meal; //Breakfast

    const currUser = JSON.parse(localStorage.getItem("user") || 'null');
    var mealsArray = JSON.parse(localStorage.getItem("meals") || '[]');

    let userAccountIndex = 0;
    for (const user of mealsArray) {
        if (user.username === currUser) {
            break;
        }
        userAccountIndex++;
    }

    const [mealPlan, setMealPlan] = useState(() => {
        const storedMealPlan = mealsArray[userAccountIndex].diet;
        return storedMealPlan ? storedMealPlan : { //this should only be used for when there is no currUser
          Sunday: { Breakfast: null, Lunch: null, Dinner: null },
          Monday: { Breakfast: null, Lunch: null, Dinner: null },
          Tuesday: { Breakfast: null, Lunch: null, Dinner: null },
          Wednesday: { Breakfast: null, Lunch: null, Dinner: null },
          Thursday: { Breakfast: null, Lunch: null, Dinner: null },
          Friday: { Breakfast: null, Lunch: null, Dinner: null },
          Saturday: { Breakfast: null, Lunch: null, Dinner: null }
        }
      });

    const recipeID = recipe;

    //API information -> change this to your personal API id and key if needed
    const app_id = "c57a8075";
    const app_key = "a36807d73b336db98850d7a307c3f226";
    const recipeURL = `https://api.edamam.com/api/recipes/v2/${recipeID}?type=public&app_id=${app_id}&app_key=${app_key}`;

    function deleteMeal() {
        setMealPlan(prevPlan => {
            const updatedPlan = {
                ...prevPlan,
                [day]: {
                    ...prevPlan[day],
                    [meal]: null
                }
            };

            //set time out gives enough time for the meals to be set in local storage
            setTimeout(() => {
              mealsArray[userAccountIndex].diet = updatedPlan;
              localStorage.setItem("meals", JSON.stringify(mealsArray));
            }, 0);
            return updatedPlan;
        });
    }

    function deleteP() {
        deleteMeal();
        setTimeout(() => {
            //communicated with the even listener in the diet nutrition page
            window.dispatchEvent(new Event('mealPlanChange'));
        }, 0);
    }

    //fetch recipe data from the url
    useEffect(() => {
        if (recipeID !== undefined) {
            fetch(recipeURL)
            .then(response => response.json())
            .then(data => {
                setRecipeData(data);
            })
            .catch(error => {
            console.error('Error fetching recipes:', error);
            });
        }
    }, [recipeID, recipeURL]);
    
    return(
        <>
            {Object.keys(recipeData).length === 0 ? (
                <></>
            ) : (
                <div className='meal-containers'>
                    <div className='meal-text'>
                        <a href={recipeData.recipe.url} target="_blank" rel="noopener noreferrer">
                            <h2>{recipeData.recipe.label}</h2>
                        </a>
                        <h3>Calories: {Math.round(parseFloat(recipeData.recipe.calories)/recipeData.recipe.yield)}g</h3>
                        <h3>Protein: {Math.round(parseFloat(recipeData.recipe.totalNutrients.PROCNT.quantity)/recipeData.recipe.yield)}g</h3>
                        <h3>Carbohydrates: {Math.round(parseFloat(recipeData.recipe.totalNutrients.CHOCDF.quantity)/recipeData.recipe.yield)}g</h3>
                        <h3>Fats: {Math.round(parseFloat(recipeData.recipe.totalNutrients.FAT.quantity)/recipeData.recipe.yield)}g</h3>
                    </div>
                    <div className='meal-image'>
                        <a href={recipeData.recipe.url} target="_blank" rel="noopener noreferrer">
                            <img src={recipeData.recipe.image} alt={recipeData.recipe.label} />
                        </a>
                        <button className='delete-meal-btn' onClick={deleteP}>Delete meal</button>
                    </div>
                </div>
            )}
        </>
    );
}
MealCard.propTypes = {
    recipe: PropTypes.string,
    meal: PropTypes.string,
    day: PropTypes.string
}

export default MealCard;
