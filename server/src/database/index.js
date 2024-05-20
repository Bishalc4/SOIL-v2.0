const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.admin = require("./models/admin.js")(db.sequelize, DataTypes);
db.following = require("./models/following.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.special = require("./models/special.js")(db.sequelize, DataTypes);
db.cart_item = require("./models/cart_item.js")(db.sequelize, DataTypes);

// Define associations
db.cart.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
db.review.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
db.review.belongsTo(db.product, { foreignKey: { name: "product_id", allowNull: false } });
db.special.belongsTo(db.product, { foreignKey: { name: "product_id", allowNull: false } });
db.cart.belongsToMany(db.product, { through: db.cart_item, as: "products", foreignKey: 'cart_id' });
db.product.belongsToMany(db.cart, { through: db.cart_item, as: "carts", foreignKey: 'product_id' });


db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  if (count > 0) {
    return;
  }

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });

  await db.user.create({ username: "mbolger", password_hash: hash, email: "mbolger@gmail.com", first_name: "Matthew", last_name : "Bolger", joinDate: "2024-05-14 12:34:56"});
}

module.exports = db;
