const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "notices",
    {
      notice_no: {
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
      notice_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      notice_content: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      notice_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "notices",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "notice_no" }],
        },
        {
          name: "NOTICE_CENTER_FK_idx",
          using: "BTREE",
          fields: [{ name: "center_no" }],
        },
      ],
    },
  );
};
