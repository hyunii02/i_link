const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "memos",
    {
      memo_no: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      group_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "groups",
          key: "group_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      memo_content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      memo_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "memos",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "memo_no" }],
        },
        {
          name: "MEMO_GROUP_FK_idx",
          using: "BTREE",
          fields: [{ name: "group_no" }],
        },
      ],
    },
  );
};
