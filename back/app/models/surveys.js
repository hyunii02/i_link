const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('surveys', {
    survey_no: {
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
    survey_result: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    survey_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'surveys',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "survey_no" },
        ]
      },
      {
        name: "SURVEY_KID_FK_idx",
        using: "BTREE",
        fields: [
          { name: "kid_no" },
        ]
      },
    ]
  });
};
