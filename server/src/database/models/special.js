module.exports = (sequelize, DataTypes) =>
    sequelize.define("special", {
      special_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      special_price: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
      }
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false
    });  