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
    const review = await db.review.create({
        text: req.text,
        rating: req.rating,
        username: req.username,
        product_id: req.product_id
    });

    //Save Review in the database
    Review.create(review)
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

    Review.update(req.text, { //!also need to be able to update the rating
        where: { id: id}
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

    Review.destroy({
        where: {id: id}
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

    Review.destroy({
        where: {username: username}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Review was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Review with username=${username}. Maybe username was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Review for user=" + username
            });
        });
}

