const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "kids",
    {
      kid_no: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      kid_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      kid_birth: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      kid_gender: {
        type: DataTypes.STRING(1),
        allowNull: true,
        validate: { isIn: ["M", "F"] },
      },
      kid_stamp: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      kid_profile_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      kid_memo: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      kid_state: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: "0",
      },
      parents_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      group_no: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "groups",
          key: "group_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      center_no: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "centers",
          key: "center_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "kids",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "kid_no" }],
        },
        {
          name: "KID_GROUP_FK_idx",
          using: "BTREE",
          fields: [{ name: "group_no" }],
        },
        {
          name: "KID_USER_FK_idx",
          using: "BTREE",
          fields: [{ name: "parents_no" }],
        },
        {
          name: "KID_CENTER_FK_idx",
          using: "BTREE",
          fields: [{ name: "center_no" }],
        },
      ],
    },
  );
};
