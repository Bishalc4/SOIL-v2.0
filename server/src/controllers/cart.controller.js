const db = require("../database");

// Select all carts from the database.
exports.all = async (req, res) => {
    try {
        const carts = await db.cart.findAll();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: "Some error occurred while retrieving carts." });
    }
};

//create a cart in the database
exports.create = async (req, res) => {
    try {
        const cart = await db.cart.create({
            username: req.body.username,
        });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Some error occurred while creating a cart." });
    }
};

//select one cart from the database
exports.one = async (req, res) => {
    try {
        const cart = await db.cart.findByPk(req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Some error occurred while retrieving a cart." });
    }
};

// delete a cart with the specified id in the request
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
        res.status(500).json({ message: "Could not delete cart with id=" + id });
    }
};

// select all carts with their item from database
exports.allItem = async (req, res) => {
    try {
        const carts_item = await db.cart_item.findAll();
        res.json(carts_item);
    } catch (error) {
        res.status(500).json({ message: "some error occurred while retrieving all carts items." });
    }
};

// create a cart item in the database
exports.createItem = async (req, res) => {
    try {
        const cart_item = await db.cart_item.create({
            cart_id: req.body.cart_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity
        });
        res.json(cart_item);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the cart item." });
    }
};

// select a cart with the specified cartid in the request
exports.oneCart = async (req, res) => {
    try {
        const cartItem = await db.cart_item.findAll({ where: { cart_id: req.params.cart_id } });
        if (cartItem) {
            res.json(cartItem);
        } else {
            res.json(null);
            res.status(404).json({ message: `Cart item with cart ID ${req.params.cart_id}` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving a cart." });
    }
};

// select a cart with the specified cartid and productid in the request
exports.oneItem = async (req, res) => {
    try {
        const cartItem = await db.cart_item.findOne({ where: { cart_id: req.params.cart_id, product_id: req.params.product_id } });
        if (cartItem) {
            res.json(cartItem);
        } else {
            res.status(404).json({ message: `Cart item with cart ID ${req.params.cart_id} and product ID ${req.params.product_id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ message: "some error occurred while retrieving a item." });
    }
};

// delete a cart with the specified cartid in the request
exports.deleteCart = async (req, res) => {
    try {
        const cartItems = await db.cart_item.findAll({ where: { cart_id: req.params.cart_id } });

        if (cartItems) {
            for (const cartItem of cartItems) {
                await cartItem.destroy();
            }
            res.status(200).json({ message: `Cart items with cart ID ${req.params.cart_id} deleted successfully.` });
        } else {
            res.status(404).json({ message: `Cart items with cart ID ${req.params.cart_id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ message:  "Could not delete items for cart with id=" + req.params.cart_id });
    }
};

// delete a cart with the specified cartid and productid in the request
exports.deleteItem = async (req, res) => {
    try {
        const cartItem = await db.cart_item.findOne({ where: { cart_id: req.params.cart_id, product_id: req.params.product_id } });

        if (cartItem) {
            await cartItem.destroy();
            res.status(200).json({ message: `Cart item with cart ID ${req.params.cart_id} and product ID ${req.params.product_id} deleted successfully.` });
        } else {
            res.status(404).json({ message: `Cart item with cart ID ${req.params.cart_id} and product ID ${req.params.product_id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ message:  "Could not delete a item for cart with id=" + req.params.cart_id + "and product id" + req.params.product_id});
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const { cart_id, product_id } = req.params;
        const { quantity } = req.body;

        const cartItem = await db.cart_item.findOne({ where: { cart_id, product_id } });

        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
            res.json(cartItem);
        } else {
            res.status(404).json({ message: `Cart item with cart ID ${cart_id} and product ID ${product_id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ message: "Some error occurred while updating quantity." });
    }
};
