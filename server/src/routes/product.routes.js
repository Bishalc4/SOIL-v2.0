module.exports = (express, app) => {
    const controller = require("../controllers/product.controller.js");
    const router = express.Router();
  
    router.get("/", controller.all);

    router.get("/select/:id", controller.one);
  
    // Add routes to server.
    app.use("/api/products", router);
  };