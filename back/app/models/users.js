const bcrypt = require("bcrypt");

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_types',
        key: 'user_type'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user_email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "user_email_UNIQUE"
    },
    user_pw: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    user_profile_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    group_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'groups',
        key: 'group_no'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    center_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'centers',
        key: 'center_no'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_no" },
        ]
      },
      {
        name: "user_email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_email" },
        ]
      },
      {
        name: "USER_CENTER_FK_idx",
        using: "BTREE",
        fields: [
          { name: "center_no" },
        ]
      },
      {
        name: "USER_TYPE_FK_idx",
        using: "BTREE",
        fields: [
          { name: "user_type" },
        ]
      },
      {
        name: "USER_GROUP_FK_idx",
        using: "BTREE",
        fields: [
          { name: "group_no" },
        ]
      },
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.user_pw) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.user_pw = bcrypt.hashSync(user.user_pw, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.user_pw) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.user_pw = bcrypt.hashSync(user.user_pw, salt);
        }
      },
    }
  });
};
