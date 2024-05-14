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

db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  //seed function can be placed here
};

db.admin = require("./models/admin.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.following = require("./models/following.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.special = require("./models/special.js")(db.sequelize, DataTypes);



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

module.exports = db;
