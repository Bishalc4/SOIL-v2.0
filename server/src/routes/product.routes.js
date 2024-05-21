module.exports = (express, app) => {
  const controller = require("../controllers/product.controller.js");
  const router = express.Router();

  router.get("/", controller.findAll);

  router.get("/select/:productID", controller.one);

  router.get("/specials", controller.allSpecials)

  // Add routes to server.
  app.use("/api/products", router);
};