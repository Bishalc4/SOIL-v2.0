const db = require("../database");

// Select all carts from the database.
exports.all = async (req, res) => {
    const carts = await db.cart.findAll();
    res.json(carts);
};

//create a cart in the database
exports.create = async (req, res) => {
    const cart = await db.user.create({
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
            res.status(200).json({ message: `cart with id ${id} deleted successfully.` });
        } else {
            res.status(404).json({ message: `cart with id ${id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while trying to delete the cart."});
    }
  };
