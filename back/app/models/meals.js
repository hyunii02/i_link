const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "meals",
    {
      meal_no: {
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
      snack_content: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      meal_content: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      meal_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "meals",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "meal_no" }],
        },
        {
          name: "MEAL_CENTER_FK_idx",
          using: "BTREE",
          fields: [{ name: "center_no" }],
        },
      ],
    },
  );
};
