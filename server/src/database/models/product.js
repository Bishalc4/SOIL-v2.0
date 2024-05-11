module.exports = (sequelize, DataTypes) =>
    sequelize.define("product", {
      product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      product_name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
      },
      special_price: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true
      },
      category: {
        type: DataTypes.STRING(26),
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false
    });  