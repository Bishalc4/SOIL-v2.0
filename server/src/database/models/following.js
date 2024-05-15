module.exports = (sequelize, DataTypes) => {
  sequelize.define("following", {
    username: {
      type: DataTypes.STRING(254),
      primaryKey: true,
      references: {
        model: sequelize.models.user,
        key: "username"
      }
    },
    following_username: {
      type: DataTypes.STRING(254),
      primaryKey: true,
      references: {
        model: sequelize.models.user, 
        key: "username"
      }
    }
  }, {
    timestamps: false
  });
};
