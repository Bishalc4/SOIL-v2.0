module.exports = (sequelize, DataTypes) =>
    sequelize.define("admin", {
      username: {
        type: DataTypes.STRING(32),
        primaryKey: true
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(254), //https://www.lifewire.com/is-email-address-length-limited-1171110
        allowNull: false
      },
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      // Should the createdAt be used to store when the user created their account?
      timestamps: false
    });  