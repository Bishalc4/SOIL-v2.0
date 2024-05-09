
import React from 'react';
import './About.scss';

function About() {
    return (
        <div className="about-container">
            <div className="welcome-text">
                Welcome to SOIL, where we cultivate more than just organic food, we encourage individuals to make healthier choices for themselves and the planet.
            </div>
            <div className="about-text">
                SOIL isn't just your average grocer; we're a long-term organic food grocer with several store locations around Melbourne. Our mission is simple: to provide premium, organic fresh food to our community while giving advice on diet, nutrition, and sustainable farming practices. We go beyond just online shopping by offering face-to-face seminars, creating meaningful connections with our customers, and building a sense of belonging within our community.
            </div>
            <h2>WE OFFER</h2>
            <div className="offer-text">
                <strong>Seamless Online Shopping:</strong> Say goodbye to the pain of in-store shopping. Our website features a user-friendly interface that allows customers to browse, purchase, and do home deliveries with ease.
            </div>
            <br />
            <div className="offer-text">
                <strong>Search Functionality:</strong> Looking for a specific product? Our search feature will make it easier than ever to find what you're looking for, saving you time and frustration.
            </div>
            <br />
            <div className="offer-text">
                <strong>Meal Planner:</strong> Looking for daily or weekly meal plans based on your preferences and goals? Our website offers a feature where you can do this with ease.
            </div>
        </div>
    );
}

export default About;
