module.exports = (express, app) => {
    const controller = require("../controllers/cart.controller.js");
    const router = express.Router();
  
    router.get("/", controller.all);  // select all carts.

    router.get("/select/:id", controller.one);  // Select a single cart with id.

    router.post("/", controller.create);        //  Create a cart for the user that register.

    router.delete("/delete/:id", controller.delete);      // Delete a cart with id
  
    // Add routes to server.
    app.use("/api/carts", router);
  };