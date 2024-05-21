const db = require("../database");

//Select one product from the database
exports.one = async (req, res) => {
  try {
    const product = await db.product.findByPk(req.params.productID, {
      include: ["special"],
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}

//Get all products with their special prices (null otherwise)
exports.findAll = async (req, res) => {
    const products = await db.product.findAll({
        include: ["special"],
      });

    res.json(products);
};

//Get all special products (only special products)
exports.allSpecials = async (req, res) => {
  const specials = await db.product.findAll({
      include: {
        model: db.special,
        as: "special",
        required: true,
      },
    });

  res.json(specials);
};