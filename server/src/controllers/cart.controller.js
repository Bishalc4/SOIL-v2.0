const db = require("../database");

// Select all carts from the database.
exports.all = async (req, res) => {
    const carts = await db.cart.findAll();
    res.json(carts);
};

//create a cart in the database
exports.create = async (req, res) => {
    const cart = await db.cart.create({
      username: req.body.username,
    });
  
    res.json(cart);
};

//select one cart from the database
exports.one = async (req, res) => {
    const cart = await db.cart.findByPk(req.params.id);
  
    res.json(cart);
};

// Delete a cart with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await db.cart.findByPk(id);
  
        if (cart) {
            await cart.destroy();
            res.status(200).json({ message: `cart with cartid ${id} deleted successfully.` });
        } else {
            res.status(404).json({ message: `cart with cartid ${id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while trying to delete the cart."});
    }
  };

  
  exports.allItem = async (req, res) => {
    const carts_item = await db.cart_item.findAll();
    res.json(carts_item);
  };

  exports.createItem = async (req, res) => {
    const cart_item = await db.cart_item.create({
      cart_id: req.body.cart_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    });
  
    res.json(cart_item);
  };

  exports.oneItem = async (req, res) => {
    const cartItem = await db.cart_item.findOne({ where: { cart_id: req.params.cart_id, product_id: req.params.product_id } });
    if (cartItem) {
        res.json(cartItem);
    } else {
        res.status(404).json({ message: `Cart item with cart ID ${req.params.cart_id} and product ID ${req.params.product_id} not found.` });
    }
  };

  exports.deleteItem = async (req, res) => {
    const cartItem = await db.cart_item.findOne({ where: { cart_id: req.params.cart_id, product_id: req.params.product_id } });

        if (cartItem) {
            await cartItem.destroy();
            res.status(200).json({ message: `Cart item with cart ID ${cart_id} and product ID ${product_id} deleted successfully.` });
        } else {
            res.status(404).json({ message: `Cart item with cart ID ${cart_id} and product ID ${product_id} not found.` });
        }
  };