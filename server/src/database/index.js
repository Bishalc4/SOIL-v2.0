const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const special = require("./models/special.js");
const product = require("./models/product.js");

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
  
  await db.product.create({ product_name: "Organic Banana", price: 0.70, category: "Fruits", imageUrl: "banana" });
  await db.product.create({ product_name: "Organic Cucumber", price: 1.20, category: "Vegetables", imageUrl: "cucumber" });
  await db.product.create({ product_name: "Organic Apple", price: 1.00, category: "Fruits", imageUrl: "apple" });
  await db.product.create({ product_name: "Organic Tomato", price: 0.90, category: "Vegetables", imageUrl: "tomato" });
  await db.product.create({ product_name: "Organic Potato", price: 1.00, category: "Vegetables", imageUrl: "potato" });
  await db.product.create({ product_name: "Organic Carrot", price: 1.20, category: "Vegetables", imageUrl: "carrot" });
  await db.product.create({ product_name: "Organic Orange", price: 0.80, category: "Fruits", imageUrl: "orange" });
  await db.product.create({ product_name: "Organic Broccoli", price: 1.80, category: "Vegetables", imageUrl: "broccoli" });
  await db.product.create({ product_name: "Organic Spinach", price: 1.50, category: "Vegetables", imageUrl: "spinach" });
  await db.product.create({ product_name: "Organic Lettuce", price: 1.00, category: "Vegetables", imageUrl: "lettuce" });
  await db.product.create({ product_name: "Organic Strawberry", price: 3.00, category: "Fruits", imageUrl: "strawberry" });
  await db.product.create({ product_name: "Organic Bell Pepper", price: 1.50, category: "Vegetables", imageUrl: "bell_pepper" });
  await db.product.create({ product_name: "Organic Watermelon", price: 4.50, category: "Fruits", imageUrl: "watermelon" });
  await db.product.create({ product_name: "Organic Onion", price: 0.80, category: "Vegetables", imageUrl: "onion" });
  await db.product.create({ product_name: "Organic Pineapple", price: 2.80, category: "Fruits", imageUrl: "pineapple" });
  await db.product.create({ product_name: "Organic Zucchini", price: 1.30, category: "Vegetables", imageUrl: "zucchini" });
  await db.product.create({ product_name: "Organic Kiwi", price: 1.50, category: "Fruits", imageUrl: "kiwi" });
  await db.product.create({ product_name: "Organic Mango", price: 2.00, category: "Fruits", imageUrl: "mango" });
  await db.product.create({ product_name: "Organic Lemon", price: 0.60, category: "Fruits", imageUrl: "lemon" });
  await db.product.create({ product_name: "Organic Milk", price: 3.50, category: "Dairy", imageUrl: "milk" });
  await db.product.create({ product_name: "Organic Eggs", price: 2.00, category: "Dairy", imageUrl: "egg" });
  await db.product.create({ product_name: "Organic Cheese", price: 5.50, category: "Dairy", imageUrl: "cheese" });
  await db.product.create({ product_name: "Organic Yogurt", price: 2.80, category: "Dairy", imageUrl: "yogurt" });
  await db.product.create({ product_name: "Organic Beef", price: 12.00, category: "Meat", imageUrl: "beef" });
  await db.product.create({ product_name: "Organic Chicken", price: 8.50, category: "Meat", imageUrl: "chicken" });
  await db.product.create({ product_name: "Organic Pork", price: 10.50, category: "Meat", imageUrl: "pork" });
  await db.product.create({ product_name: "Organic Turkey", price: 9.00, category: "Meat", imageUrl: "turkey" });
  await db.product.create({ product_name: "Organic Quinoa", price: 4.50, category: "Grains", imageUrl: "quinoa" });
  await db.product.create({ product_name: "Organic Barley", price: 3.00, category: "Grains", imageUrl: "barley" });
  await db.product.create({ product_name: "Organic Lentils", price: 2.50, category: "Grains", imageUrl: "lentils" });
  await db.product.create({ product_name: "Organic Chickpeas", price: 2.80, category: "Grains", imageUrl: "chickpeas" });
  await db.product.create({ product_name: "Organic Peas", price: 2.00, category: "Grains", imageUrl: "peas" });
  
  await db.special.create({ special_price: 1.89, product_id: 32});
}

module.exports = db;
