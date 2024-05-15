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
      unit_price: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
      }
    }, {
      timestamps: false
    });
  