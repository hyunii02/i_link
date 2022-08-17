const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "groups",
    {
      group_no: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      center_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "centers",
          key: "center_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      group_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "groups",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "group_no" }],
        },
        {
          name: "GROUP_CENTER_FK_idx",
          using: "BTREE",
          fields: [{ name: "center_no" }],
        },
      ],
    },
  );
};
