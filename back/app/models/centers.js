const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "centers",
    {
      center_no: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      center_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      center_addr: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      center_tel: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      master_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "center_master_UNIQUE",
        references: {
          model: "users",
          key: "user_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "centers",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "center_no" }],
        },
        {
          name: "CENTER_USER_FK_idx",
          using: "BTREE",
          fields: [{ name: "master_no" }],
        },
      ],
    },
  );
};
