module.exports = (sequelize, DataTypes) =>
    sequelize.define("following", {
        
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: true
    });  