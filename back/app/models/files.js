const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "files",
    {
      file_no: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      notice_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "notices",
          key: "notice_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      file_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      file_location: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "files",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "file_no" }],
        },
        {
          name: "FILE_NOTICE_FK_idx",
          using: "BTREE",
          fields: [{ name: "notice_no" }],
        },
      ],
    },
  );
};
