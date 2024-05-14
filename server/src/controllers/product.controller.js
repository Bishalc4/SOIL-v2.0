const db = require("../database");

// Select all products from the database.
exports.all = async (req, res) => {
    const products = await db.product.findAll();
  
    res.json(products);
};

// Select one product from the database.
exports.one = async (req, res) => {
    const product = await db.product.findByPk(req.params.id);
  
    res.json(product);
};