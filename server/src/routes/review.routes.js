module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  //get all reviews
  router.get("/", controller.findAll);

  //get all reviews for a particular product
  router.get("/product/:product_id", controller.findForProduct);

  //get all reviews for a particular user
  router.get("/user/:username", controller.findByUser);

  //create a review
  router.post("/", controller.createReview)

  // Add routes to server.
  app.use("/api/reviews", router);
};