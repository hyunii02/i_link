const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "quiz_results",
    {
      result_no: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      quiz_ans: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      kid_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "kids",
          key: "kid_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quiz_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "quiz",
          key: "quiz_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "quiz_results",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "result_no" }],
        },
        {
          name: "RESULT_KID_FK_idx",
          using: "BTREE",
          fields: [{ name: "kid_no" }],
        },
        {
          name: "RESULT_QUIZ_FK_idx",
          using: "BTREE",
          fields: [{ name: "quiz_no" }],
        },
      ],
    },
  );
};
