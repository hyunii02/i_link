const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('files', {
    file_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    notice_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'notices',
        key: 'notice_no'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    file_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    file_type: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    file_location: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'files',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "file_no" },
        ]
      },
      {
        name: "FILE_NOTICE_FK_idx",
        using: "BTREE",
        fields: [
          { name: "notice_no" },
        ]
      },
    ]
  });
};
