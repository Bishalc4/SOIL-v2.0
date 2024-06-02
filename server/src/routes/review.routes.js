module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  //get all reviews
  router.get("/", controller.findAll);

  //create a review
  router.post("/", controller.createReview)
   
  //update a Review with id
  router.put("/:id", controller.update);

  //get a review for a particular review id
  router.get("/select/:review_id", controller.findByReviewId);

  //delete a Review with id
  router.delete("/:id", controller.delete);

  //get all reviews for a particular product
  router.get("/product/:product_id", controller.findForProduct);

  //delete a Review with product_id
  router.delete("product/:product_id", controller.deleteProductReviews);

  //get all reviews for a particular user
  router.get("/user/:username", controller.findByUser);

  //delete all reviews for username
  router.delete("/delete/user/:username", controller.deleteUserReviews);

  // Add routes to server.
  app.use("/api/reviews", router);
};