import AddMealBtn from "../AddMealBtn/AddMealBtn.jsx"
import "./RecipeCard.scss"

function RecipeCard(recipe) {
    //determine the average nutries per serving
    const uri = recipe.recipe.uri;
    const recipeTag = uri.split("_")[1];
    const recipeCalories = Math.round(recipe.recipe.calories/recipe.recipe.yield);
    const recipeFat = Math.round(recipe.recipe.totalNutrients.FAT.quantity/recipe.recipe.yield);
    const recipeProtein = Math.round(recipe.recipe.totalNutrients.PROCNT.quantity/recipe.recipe.yield);
    const recipeCarbohydrates = Math.round(recipe.recipe.totalNutrients.CHOCDF.quantity/recipe.recipe.yield);

    //determine percentage of daily nutrient intake
    //const percentageDailyCalories = 100 * (recipeCalories/macros.calories);

    return(
        <div className="recipe-card-container">
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            {/* divides total amount by number of servings */}
            <div>
                <p>{recipeCalories} calories</p>
                <p>{recipeFat}g of fat</p>
                <p>{recipeProtein}g of protein</p>
                <p>{recipeCarbohydrates}g of carbohydrates</p>
            </div>
            <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a><br/>
            <AddMealBtn id={recipeTag} />
        </div>
    );
}

export default RecipeCard