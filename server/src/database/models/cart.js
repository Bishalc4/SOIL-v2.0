module.exports = (sequelize, DataTypes) =>
    sequelize.define("cart", {
        
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: true
    });  