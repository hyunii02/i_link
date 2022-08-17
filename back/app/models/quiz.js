const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "quiz",
    {
      quiz_no: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      quiz_writer: {
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
        allowNull: false,
        references: {
          model: "groups",
          key: "group_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quiz_content: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      quiz_sel_1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      quiz_sel_2: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      quiz_sel_3: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      quiz_sel_4: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      quiz_ans: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quiz_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "quiz",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "quiz_no" }],
        },
        {
          name: "QUIZ_USER_FK_idx",
          using: "BTREE",
          fields: [{ name: "quiz_writer" }],
        },
        {
          name: "QUIZ_GROUP_FK_idx",
          using: "BTREE",
          fields: [{ name: "group_no" }],
        },
      ],
    },
  );
};
