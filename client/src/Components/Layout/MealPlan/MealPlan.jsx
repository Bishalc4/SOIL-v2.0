import DailyMealPlan from "../DailyMealPlan/DailyMealPlan";
import "./MealPlan.scss"

//this page controls the actual structure of the meal plan
function MealPlan() {
    return(
        <div className="meal-container">
            <h1>Your Weekly Meal Plan</h1>
            <div className="daily-meals-container">
                <DailyMealPlan className="day-meal" day="Sunday" />
                <DailyMealPlan className="day-meal" day="Monday" />
                <DailyMealPlan className="day-meal" day="Tuesday" />
                <DailyMealPlan className="day-meal" day="Wednesday" />
                <DailyMealPlan className="day-meal" day="Thursday" />
                <DailyMealPlan className="day-meal" day="Friday" />
                <DailyMealPlan className="day-meal" day="Saturday" />
            </div>
        </div>
    );
}

export default MealPlan