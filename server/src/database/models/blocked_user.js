module.exports = (sequelize, DataTypes) =>
    sequelize.define("blocked_user", {
       blocked_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false
    }); 