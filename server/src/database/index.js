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
db.admin = require("./models/admin.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.following = require("./models/following.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.special = require("./models/special.js")(db.sequelize, DataTypes);

//establish connections
db.user.hasOne(db.cart);
db.cart.belongsTo(db.user, { forgiegnKey: { name: "username", allowNull: false}});
db.user.hasOne(db.admin);
db.admin.belongsTo(db.user, { foreignKey: "username", allowNull: false });
db.user.hasMany(db.review);
db.review.belongsTo(db.user, { foreignKey: "username" });
db.product.hasMany(db.review);
db.review.belongsTo(db.product, { foreignKey: "producy_id" });
db.product.hasOne(db.special_deal);
db.special_deal.belongsTo(db.product, { foreignKey: 'Product_id' });

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
