module.exports = (sequelize, DataTypes) =>
  sequelize.define("cart", {
    cart_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  }, {
    timestamps: false
  });
