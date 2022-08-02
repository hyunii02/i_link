const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albums', {
    album_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'group_no'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    album_url: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'albums',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "album_no" },
        ]
      },
      {
        name: "ALBUM_GROUP_FK_idx",
        using: "BTREE",
        fields: [
          { name: "group_no" },
        ]
      },
    ]
  });
};
