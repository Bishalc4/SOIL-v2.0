//https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

const db = require("../database");

// Select all reviews (for all products)
exports.findAll = async (req, res) => {
    const reviews = await db.review.findAll();
  
    res.json(reviews);
};

// Select all reviews for a particular product
exports.findForProduct = async (req, res) => {
    const reviews = await db.review.findAll({
        include: ["product"],
        where: {
            product_id: req.params.product_id
        }
    });

    res.json(reviews);
}

// Select all reviews for a praticular user
exports.findByUser = async (req, res) => {
    const reviews = await db.review.findAll({
        include: ["user"],
        where: {
            username: req.params.username
        }
    });

    res.json(reviews);
}

exports.createReview = async (req, res) => {
    const review = await db.review.create({
        text: req.text,
        rating: req.rating,
        username: req.username,
        product_id: req.product_id
    });

    res.json(review);
}