import React from 'react';
import Vegetable_Gardening from '../../assets/Vegetable-Gardening.jpg'
import Potato_farming from "../../assets/potato-farming.jpg"
import Tomato_farming from "../../assets/tomato-farming.jpg"
import './GrowItYourself.scss';

function GrowItYourself() {
    return (
        <div className="grow-it-yourself-container">
            <h1>Small-Scale Farming</h1>
            <img src={Vegetable_Gardening} alt="Vegetable Garden" />
            <h2>Vegetables to Grow in Your Backyard</h2>
            <div className="section">
                <h3>Essential Needs to Grow Organic Vegetables:</h3>
                <p>
                    <strong>Sunshine:</strong> Most vegetables require full sun during the day. It's important to plant them in your backyard where the sun is not blocked by other objects.
                </p>
                <p>
                    <strong>Good Soil:</strong> All veggies need the best organic soil mix to grow to their full potential. The qualities to look for in good soil are fertility and texture. 
                    Adding one or more forms of organic matter promotes the healthiest soil for vegetable growth and development.
                </p>
                <p>
                    <strong>Seeds or Seedlings:</strong> Decide whether you want to start from seeds or purchase young seedlings. For beginners, seedlings are the better option.
                </p>
                <p>
                    <strong>Watering:</strong> Maintain a consistent watering schedule. Water in the morning to allow the soil to dry during the day.
                </p>
                <p>
                    <strong>Space:</strong> There are many different ways to plant your vegetables – garden beds, plots in the ground, planters, pots, vertical gardens, and more.
                </p>

                <p>
                    <strong>Fertiliser:</strong> Use organic Fertiliser to feed the vegetables planted as they are the best and safest for your vegetables. 
                </p>
                <br></br>
                <h2>Farming tools you may need:</h2>
                    <p>
                        <strong>Shovel:</strong> For digging holes for planting, mixing soil, and moving dirt.
                    </p>
                   
                    <p>
                        <strong>Rake:</strong> Helps to level soil.
                    </p>
                    <p>
                        <strong>Hoe:</strong> Useful for weeding and cultivating the soil.
                    </p>
                    <p>
                        <strong>Watering Can:</strong> Essential for watering your vegetables regularly.
                    </p>
                    <p>
                        <strong>Farming Gloves:</strong> Protect your hands from blisters.
                    </p>
                    <p>
                        <strong>Wheelbarrow:</strong> Useful for transporting soil, plants, and other materials around your backyard.
                    </p>
                    <p>
                        <strong>pH Meter:</strong> Helps to monitor soil pH levels, ensuring vegetables are growing to their full potential.
                    </p>
            </div>

            <h2>Example of How to Grow a Organic Vegetable in Your Backyard</h2>
            <h2>Tomato</h2>
            <img src={Tomato_farming} alt="Tomato Farming" />
            <br></br>
            <br></br>
            <strong>Information on how to grow Tomatos</strong>
            <table className="tomato-table">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Harvest Time</td>
                        <td>2-3 months</td>
                    </tr>
                    <tr>
                        <td>Ideal Temperatures</td>
                        <td>Warm temperatures, between 21-29°C</td>
                    </tr>
                    <tr>
                        <td>Planting Time</td>
                        <td>Late spring through early summer</td>
                    </tr>
                    <tr>
                        <td>Spacing</td>
                        <td>45-60 cm apart</td>
                    </tr>
                    <tr>
                        <td>Germination Time</td>
                        <td>5-10 days</td>
                    </tr>
                    <tr>
                        <td>Light Preference</td>
                        <td>Full sun</td>
                    </tr>
                </tbody>
            </table>
            <h2>Potato</h2>
            <img src={Potato_farming} alt="Potato Farming"/>
            <br></br>
            <br></br>
            <strong>Information on how to grow Potatos</strong>
            <table className="potato-table">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Harvest Time</td>
                        <td>3-4 months</td>
                    </tr>
                    <tr>
                        <td>Ideal Temperatures</td>
                        <td>All year round</td>
                    </tr>
                    <tr>
                        <td>Planting Time</td>
                        <td>Spring</td>
                    </tr>
                    <tr>
                        <td>Spacing</td>
                        <td>30-45 cm</td>
                    </tr>
                    <tr>
                        <td>Germination Time</td>
                        <td>10-15 days</td>
                    </tr>
                    <tr>
                        <td>Light Preference</td>
                        <td>Full sun to partial shade</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default GrowItYourself;
