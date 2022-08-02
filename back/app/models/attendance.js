const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attendance', {
    attendance_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kid_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'kids',
        key: 'kid_no'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    kid_in: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    kid_out: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    attendance_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    }
  }, {
    sequelize,
    tableName: 'attendance',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "attendance_no" },
        ]
      },
      {
        name: "ATTENDANCE_KID_FK_idx",
        using: "BTREE",
        fields: [
          { name: "kid_no" },
        ]
      },
    ]
  });
};
