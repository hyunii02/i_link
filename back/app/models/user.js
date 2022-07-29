const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define("users", {
    user_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_type: {
      type: Sequelize.INTEGER,
    },
    user_email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    user_pw: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_phone: {
      type: Sequelize.STRING,
    },
    user_profile_url: {
      type: Sequelize.STRING,
    },
    class_no: {
      type: Sequelize.INTEGER,
    },
    preschool_no: {
      type: Sequelize.INTEGER,
    }
  },
  { 
    timestamps: false,
    // 비밀번호 암호화
    hooks: {
      beforeCreate: async (user) => {
        if (user.user_pw) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.user_pw = bcrypt.hashSync(user.user_pw, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.user_pw) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.user_pw = bcrypt.hashSync(user.user_pw, salt);
        }
      },
    }
  });

  return User;
}