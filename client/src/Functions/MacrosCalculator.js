//function to calculate the Basal Metabolic Rate (BMR)
function calculateBMR(sex, weight, height, age) {
    if (sex === "Male") {
        return (10*weight) + (6.25*height) - (5*age) + 5;
    } else {
        return (10*weight) + (6.25*height) - (5*age) - 161;
    } 
}

//function to calculate the Total Energy Expenditure (TEE)
function calculateTEE(BMR, activityLevel) {
    if (activityLevel === "sedentary") {
        return BMR * 1.2;
    } else if (activityLevel === "light") {
        return BMR * 1.375;
    } else if (activityLevel === "moderate") {
        return BMR * 1.55;
    } else if (activityLevel === "active") {
        return BMR * 1.725;
    } else if (activityLevel === "extra-active") {
        return BMR * 1.9;
    }
}

function calculateCalories(TEE, healthGoal) {
    if (healthGoal === "extreme-loss") {
        return TEE - (TEE * 0.4);
    } else if (healthGoal === "loss") {
        return TEE - (TEE * 0.2);
    } else if (healthGoal === "maintain") {
        return TEE;
    } else if (healthGoal === "gain") {
        return TEE + (TEE * 0.2);
    } else if (healthGoal === "extreme-gain") {
        return TEE + (TEE * 0.4);
    }
}

function calculateProtein(calories, healthGoal) {
    if (healthGoal === "extreme-loss") {
        return (calories * 0.15)/4;
    } else if (healthGoal === "loss") {
        return (calories * 0.15)/4;
    } else if (healthGoal === "maintain") {
        return (calories * 0.15)/4;
    } else if (healthGoal === "gain") {
        return (calories * 0.2)/4;
    } else if (healthGoal === "extreme-gain") {
        return (calories * 0.25)/4;
    }
}

function calculateFat(calories, healthGoal) {
    if (healthGoal === "extreme-loss") {
        return (calories * 0.15)/9;
    } else if (healthGoal === "loss") {
        return (calories * 0.18)/9;
    } else if (healthGoal === "maintain") {
        return (calories * 0.2)/9;
    } else if (healthGoal === "gain") {
        return (calories * 0.25)/9;
    } else if (healthGoal === "extreme-gain") {
        return (calories * 0.3)/9;
    }
}

function calculateCarbs(calories, healthGoal) {
    if (healthGoal === "extreme-loss") {
        return (calories * 0.7)/4;
    } else if (healthGoal === "loss") {
        return (calories * 0.67)/4;
    } else if (healthGoal === "maintain") {
        return (calories * 0.65)/4;
    } else if (healthGoal === "gain") {
        return (calories * 0.55)/4;
    } else if (healthGoal === "extreme-gain") {
        return (calories * 0.45)/4;
    }
}

export function calculateMacros(profileDetails) {
    const sex = profileDetails.sex;
    const activityLevel = profileDetails.activityLevel;
    const healthGoal = profileDetails.healthGoals;
    const age = parseInt(profileDetails.age);
    const weight = parseFloat(profileDetails.weight);
    const height = parseFloat(profileDetails.height);

    const BMR = calculateBMR(sex, weight, height, age);
    const TEE = calculateTEE(BMR, activityLevel);

    const calories = Math.round(calculateCalories(TEE, healthGoal));
    const protein = Math.round(calculateProtein(calories, healthGoal));
    const fat = Math.round(calculateFat(calories, healthGoal));
    const carbohydrates = Math.round(calculateCarbs(calories, healthGoal));

    return {
        calories: calories,
        protein: protein,
        fat: fat,
        carbohydrates: carbohydrates
    };
}