module.exports = (express, app) => {
  const controller = require("../controllers/product.controller.js");
  const router = express.Router();

  //get all products
  router.get("/", controller.findAll);

  //get all special products
  router.get("/specials", controller.allSpecials)

  //retrieve a singular product (specified by productID)
  router.get("/select/:productID", controller.one);

  //get all products of a certain category (specified by productCategory)
  router.get("/category/:productCategory", controller.findByCategory);

  //get all special products of a certain category (specified by productCategory)
  router.get("/category/:productCategory/specials", controller.findBySpecialsCategory);

  // Add routes to server.
  app.use("/api/products", router);
};