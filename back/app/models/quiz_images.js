const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "quiz_images",
    {
      img_no: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      quiz_content_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quiz_sel_1_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quiz_sel_2_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quiz_sel_3_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quiz_sel_4_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
      tableName: "quiz_images",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "img_no" }],
        },
        {
          name: "IMAGE_QUIZ_FK_idx",
          using: "BTREE",
          fields: [{ name: "quiz_no" }],
        },
      ],
    },
  );
};
