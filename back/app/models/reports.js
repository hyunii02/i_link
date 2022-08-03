const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reports', {
    report_no: {
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
    report_writer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_no'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    report_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'report_types',
        key: 'report_type'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    report_content: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    report_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'reports',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "report_no" },
        ]
      },
      {
        name: "REPORT_KID_FK_idx",
        using: "BTREE",
        fields: [
          { name: "kid_no" },
        ]
      },
      {
        name: "REPORT_USER_FK_idx",
        using: "BTREE",
        fields: [
          { name: "report_writer" },
        ]
      },
      {
        name: "REPORT_TYPE_FK_idx",
        using: "BTREE",
        fields: [
          { name: "report_type" },
        ]
      },
    ]
  });
};
