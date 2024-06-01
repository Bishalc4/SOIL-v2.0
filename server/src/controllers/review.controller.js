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
// Select a review for a particular review id
exports.findByReviewId = async (req, res) => {
    try{
        const review = await db.review.findByPk(req.params.review_id);

        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
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

// Create and Save a new Review
exports.createReview = async (req, res) => {
    //Validate review content
    if (!req.body.text) {
        res.status(400).send({
            message: "Review text cannot be empty"
        });
        return; //return early due to invalid review
    }

    //validate rating here
    if (req.body.rating < 1 || req.body.rating > 5) {
        res.status(400).send({
            message: "Rating must be an integer from 1 to 5"
        });
        return;
    }

    //Create a Review
    const review = {
        text: req.body.text,
        rating: req.body.rating,
        username: req.body.username,
        product_id: req.body.product_id
    }

    //Save Review in the database
    db.review.create(review)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Review."
            });
        });
};

//Update a Review by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    db.review.update( { text: req.body.text, rating: req.body.rating }, {
        where: { review_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Review was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Review with id=${id}. Maybe Review was not found or req.text is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Review with id=${id}`
            })
        });
};

//Delete a Review with the id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log("message");

    db.review.destroy({
        where: {review_id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Review was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Review with id=${id}. Maybe Review was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Review with id=" + id
            });
        });
}

//Delete a Review with the productID in the request
exports.deleteProductReviews = (req, res) => {
    const product_id = req.params.product_id;

    Review.destroy({
        where: {product_id: product_id}
    })
        .then(nums => {
            res.send({ message: `${nums} Reviews were deleted successfully!` })
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Review with product_id=" + product_id
            });
        });
}

//Delete a Review with the username in the request
exports.deleteUserReviews = (req, res) => {
    const username = req.params.username;

    db.review.destroy({
        where: {username: username},
        truncate: true
    })
        .then(nums => {
            res.send({ message: `${nums} Reviews were deleted successfully!` })
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Review for user=" + username
            });
        });
}

