module.exports = (sequelize, DataTypes) =>
    sequelize.define("cart_item", {
      cart_id: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.cart,
          key: 'cart_id'
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.product,
          key: 'product_id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      timestamps: true
    });
  