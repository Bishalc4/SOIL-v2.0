module.exports = (sequelize, DataTypes) =>
    sequelize.define("review", {
      review_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
      },
    }, {
      // Add the timestamp attributes (updatedAt, createdAt).
      timestamps: true
    });  