// import Infographic from "../../assets/Infographic.png"
import pesticides from "../../assets/pesticides.png";
import animalWelfare from "../../assets/animalWelfare.png"
import GMO from "../../assets/GMO.png"
import conservation from "../../assets/conservation.png"
import sustainable from "../../assets/sustainable.png"
import vitamins from "../../assets/vitamins.png"
import { Link } from 'react-router-dom';
import DietNutritionImage from "../../assets/DietNutritionImage.jpg"
import "./Home.scss"

//This component is for the home/landing page
function Home() {
    return(
        <div className="home-container">
            <div className="row">
                <div className="overlay">
                    <h1>SOIL</h1>
                    <p>
                        At SOIL, we’re passionate about offering
                        premium, organic, and fresh food. We’re
                        dedicated to sourcing the finest ingredients
                        for your healthy lifestyle.
                    </p>
                    <Link to="/about">
                        <button className="read-more-btn">Read More</button>
                    </Link>
                </div>
            </div>

            <div className='infographic-container'>
                <div className='infographic-row'>
                    <div className="infographic-section">
                        <img src={pesticides} className="infographic-image"></img>
                        <div className="infographic-information-container">
                            <h3>No pesticides or fertilizers</h3>
                            <p>Promoting healthier diets and reducing
                                the risk of exposure to harmful chemicals.
                            </p>
                        </div>
                    </div>
                    <div className="infographic-section">
                        <img src={sustainable} className="infographic-image"></img>
                        <div className="infographic-information-container">
                            <h3>Sustainable packaging</h3>
                            <p>All products come in sustainable packaging options,
                                using biodegradable materials, reducing waste.
                            </p>
                        </div>
                    </div>
                    <div className="infographic-section">
                        <img src={vitamins} className="infographic-image"></img>
                        <div className="infographic-information-container">
                            <h3>Essential vitamins and minerals</h3>
                            <p>Organic foods contain higher levels of essential
                                vitamins, mineralsand antioxidants compared to
                                conventionally grown foods.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='infographic-row'>
                    <div className="infographic-section">
                        <img src={conservation} className="infographic-image"></img>
                        <div className="infographic-information-container">
                            <h3>Conservation</h3>
                            <p>Organic farming priorotises soil and water
                                conservation, biodiversity and reducing
                                polution.
                            </p>
                        </div>
                    </div>
                    <div className="infographic-section">
                        <img src={animalWelfare} className="infographic-image"></img>
                        <div className="infographic-information-container">
                            <h3>Animal welfare</h3>
                            <p>Organic dairy farming standards prioritise humane
                                treatment, providing animals with access to
                                outdoor spaces and natural diet.
                            </p>
                        </div>
                    </div>
                    <div className="infographic-section">
                        <img src={GMO} className="infographic-image"></img>
                        <div className="infographic-information-container">
                            <h3>No GMO</h3>
                            <p>Organic foods are produced without genetically
                                modified organisms (GMOs).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="diet-nutrition-container">
                <img src={DietNutritionImage} alt="Diet Nutrition Image" className="diet-nutrition-img"></img>
                <div className="diet-nutrition-info">
                    <h1>Diet & Nutrition</h1>
                    <p>
                        Balance Macronutrients: Offer guidance on balancing
                        macronutrients(carbohydrates, proteins, and fats) in
                        meals to support overall health and energy levels.
                        Emphasize the importance of incorporating a variety
                        of nutrient-dense foods into their diet.
                    </p>
                    <Link to="/dietnutrition">
                        <button>Learn more</button>
                    </Link>
                </div>
            </div>

            <div className="community-row">
                <div className="community-container">
                    <div className="community-info-container">
                        <h1>Community</h1>
                        <p>
                            We’re committed to empowering our community to
                            cultivate their own fresh, organic vegetables, fostering
                            self-sustainability and healthy living.
                        </p>
                        <Link to="/growityourself">
                            <button>Read More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home