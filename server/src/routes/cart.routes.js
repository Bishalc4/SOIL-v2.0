module.exports = (express, app) => {
  const controller = require("../controllers/cart.controller.js");
  const router = express.Router();

  router.get("/", controller.all);  // select all carts.

  router.get("/select/:id", controller.one);  // Select a single cart with id.

  router.post("/", controller.create);        //  Create a cart for the user that register.

  router.delete("/delete/:id", controller.delete);      // Delete a cart with id

  router.get("/items", controller.allItem);  // select all the carts items

  router.get("/items/select/:cart_id/:product_id", controller.oneItem);  // select a single item with cartid and productid

  router.get("/items/select/:cart_id", controller.oneCart);  // select all cart items with cartid

  router.post("/items", controller.createItem);  // create a cart item
  
  router.delete("/items/delete/:cart_id/:product_id", controller.deleteItem);  // Delete a cart item with cartid and productid

  router.delete("/items/delete/:cart_id", controller.deleteCart);  // delete a cart with cartid

  router.put("/items/:cart_id/:product_id", controller.updateQuantity); 

  // Add routes to server.
  app.use("/api/carts", router);
};