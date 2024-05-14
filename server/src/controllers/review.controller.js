//https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

const db = require("../database");

// Select all reviews (for all products)
exports.all = async (req, res) => {
    const reviews = await db.review.findAll();
  
    res.json(reviews);
};

exports.oneProduct = async (req, res) => {
    //return the reviews for one specific product
};

exports.oneUser = async (req, res) => {
    //return the reviews for a specific user
};