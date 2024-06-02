module.exports = (sequelize, DataTypes) =>
    sequelize.define("deleted_review", {
       deleted_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false
    }); 