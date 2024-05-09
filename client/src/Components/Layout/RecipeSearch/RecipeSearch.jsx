import { useState } from "react";
import RecipeCard from "../Recipe/RecipeCard";
import { IoSearch } from "react-icons/io5";
import "./RecipeSearch.scss"

function RecipeSearch() {
    const [recipes, setRecipes] = useState([]);
    const [showRecipes, setShowRecipes] = useState(false);
    const appId = "c57a8075";
    const appKey = "a36807d73b336db98850d7a307c3f226";

    const [query, setQuery] = useState({queryText: "",
                                        healthLabel: "", //default [from macros]
                                        mealType: "",
                                        caloriesMinimum: "", //e.g. 100-300, 400 (max 400), 200+ (over 200) [from macros]
                                        caloriesMaximum: "",
                                        carbohydratesMinimum: "", //e.g. 100-300, 400 (max 400), 200+ (over 200)
                                        carbohydratesMaximum: "", //e.g. 100-300, 400 (max 400), 200+ (over 200)
                                        proteinMinimum: "", //e.g. 100-300, 400 (max 400), 200+ (over 200)                               
                                        proteinMaximum: "", //e.g. 100-300, 400 (max 400), 200+ (over 200)                               
    });
    
    function handleQueryText(e) {
        setQuery({...query, queryText: e.target.value});
    }

    function handleHealthLabel(e) {
        setQuery({...query, healthLabel: e.target.value});
    }

    function handleMealType(e) {
        setQuery({...query, mealType: e.target.value});
    }

    function handleCaloriesMinimum(e) {
        setQuery({...query, caloriesMinimum: e.target.value});
    }

    function handleCaloriesMaximum(e) {
        setQuery({...query, caloriesMaximum: e.target.value});
    }

    function handleProteinMinimum(e) {
        setQuery({...query, proteinMinimum: e.target.value});
    }

    function handleProteinMaximum(e) {
        setQuery({...query, proteinMaximum: e.target.value});
    }

    function handleCarbohydratesMinimum(e) {
        setQuery({...query, carbohydratesMinimum: e.target.value});
    }

    function handleCarbohydratesMaximum(e) {
        setQuery({...query, carbohydratesMaximum: e.target.value});
    }
    
    function getQueryFilters() {
        var filter = "";

        if (query.healthLabel != "") {
            filter+= "&health=" + query.healthLabel;
        }

        if (query.mealType != "") {
            filter+= "&mealType=" + query.mealType;
        }

        if (query.caloriesMinimum !== "" && query.caloriesMaximum === "") {
            //minimum only
            filter+= "&calories=" + query.caloriesMinimum + "%2B";
        } else if (query.caloriesMinimum === "" && query.caloriesMaximum !== "") {
            //minimum only
            filter+= "&calories=" + query.caloriesMaximum;
        } else if (query.caloriesMinimum !="" && query.caloriesMaximum !="") {
            //minimum and maximum
            filter+= "&calories=" + query.caloriesMinimum + "-" + query.caloriesMaximum;
        }

        if (query.carbohydratesMinimum !== "" && query.carbohydratesMaximum === "") {
            //minimum only
            filter+= "&nutrients%5BCHOCDF%5D=" + query.carbohydratesMinimum + "%2B";
        } else if (query.carbohydratesMinimum === "" && query.carbohydratesMaximum !== "") {
            //minimum only
            filter+= "&nutrients%5BCHOCDF%5D=" + query.carbohydratesMaximum;
        } else if (query.carbohydratesMinimum !="" && query.carbohydratesMaximum !="") {
            //minimum and maximum
            filter+= "&nutrients%5BCHOCDF%5D=" + query.carbohydratesMinimum + "-" + query.carbohydratesMaximum;
        }

        if (query.proteinMinimum !== "" && query.proteinMaximum === "") {
            //minimum only
            filter+= "&nutrients%5BPROCNT%5D=" + query.proteinMinimum + "%2B";
        } else if (query.proteinMinimum === "" && query.proteinMaximum !== "") {
            //maximum only
            filter+= "&nutrients%5BPROCNT%5D=" + query.proteinMaximum;
        } else if (query.proteinMinimum !="" && query.proteinMaximum !="") {
            //minimum and maximum
            filter+= "&nutrients%5BPROCNT%5D=" + query.proteinMinimum + "-" + query.proteinMaximum;
        }

        console.log(filter);
        return filter;
    }

    function handleGetRecipes() {
        const queryFilters = getQueryFilters();
        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query.queryText}&app_id=${appId}&app_key=${appKey}${queryFilters}`)
          .then(response => response.json())
          .then(data => {
            setRecipes(data.hits);
          })
          .catch(error => {
            console.error('Error fetching recipes:', error);
        });
        setShowRecipes(true);
    }

    return(
        <div className="recipe-search-container">
            <div className="recipe-search">
                <div className="search-container">
                    <input type="text" placeholder="Search recipe or ingredient" value={query.queryText} onChange={handleQueryText} required/>
                    <IoSearch className="search-icon" onClick={handleGetRecipes}/>
                </div>
                <div className="search-filters">
                    <div className="meal-preferences-row">
                        <div className="dietary-preferences-input">
                            <h3>Dietary Preference:</h3>
                            <select id="healthLabel" name="healthLabel" value={query.healthLabel} onChange={handleHealthLabel}>
                                <option value="">None</option>
                                <option value="alcohol-free">Alcohol-free</option>
                                <option value="dairy-free">Dairy-free</option>
                                <option value="egg-free">Low-carb</option>
                                <option value="fish-free">Low-fat</option>
                                <option value="gluten-free">Gluten-free</option>
                                <option value="keto-friendly">Keto-friendly</option>
                                <option value="low-sugar">Low-sugar</option>
                                <option value="vegan">Vegan</option>
                                <option value="vegetarian">Vegetarian</option>
                            </select>
                        </div>
                        <div className="meal-preferences-input">
                            <h3>Meal preference:</h3>
                            <select id="mealType" name="mealType" value={query.mealType} onChange={handleMealType}>
                                <option value="">None</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                        </div>
                    </div>
                    <div className="calorie-row">
                        <h3>Calories:</h3>
                        <div className="calorie-preferences-row">
                            <input id="caloriesMinimum" type="number" min="1" step="1" value={query.caloriesMinimum} placeholder="Min calories" onChange={handleCaloriesMinimum}/>
                            <span> - </span>
                            <input id="caloriesMaximum" type="number" min={query.caloriesMinimum + 1} step="1" value={query.caloriesMaximum} placeholder="Max calories" onChange={handleCaloriesMaximum}/>
                        </div>
                    </div>
                    <div className="protein-row">
                        <h3>Protein:</h3>
                        <div className="protein-preferences-row">
                            <input id="proteinMinimum" type="number" min="1" step="1" value={query.proteinMinimum} placeholder="Min protein" onChange={handleProteinMinimum}/>
                            <span>-</span>
                            <input id="proteinMaximum" type="number" min={query.proteinMinimum + 1} step="1" value={query.proteinMaximum} placeholder="Max protein" onChange={handleProteinMaximum}/>
                        </div>
                    </div>
                    <div className="carbohydrate-row">
                        <h3>Carbohydrates:</h3>
                        <div className="carbohydrate-preferences-row">
                            <input id="carbohydratesMinimum" type="number" min="1" step="1" value={query.carbohydratesMinimum} placeholder="Min carbohydrates" onChange={handleCarbohydratesMinimum}/>
                            <span>-</span>
                            <input id="carbohydratesMaximum" type="number" min={query.carbohydratesMinimum + 1} step="1" value={query.carbohydratesMaximum} placeholder="Max carbohydrates" onChange={handleCarbohydratesMaximum}/>
                        </div>
                    </div>
                </div>
            </div>
            {showRecipes ? (
                <>
                    {recipes.length === 0 ? ( // Check if recipes array is empty
                        <></> // Render heading if recipes array is empty
                    ) : (
                        <ul className="recipes-container">
                            {recipes.map((recipe, index) => (
                                <RecipeCard key={index} recipe={recipe.recipe} />
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default RecipeSearch