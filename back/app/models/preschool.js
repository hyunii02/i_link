module.exports = (sequelize, Sequelize) => {
  const Preschool = sequelize.define("preschool", {
    preschool_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    preschool_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preschool_addr: {
      type: Sequelize.STRING,
    },
    preschool_tel: {
      type: Sequelize.STRING,
    },
    principal_no: {
      type: Sequelize.INTEGER,
    }
  },
    { 
    freezeTableName: true,
    timestamps: false,
    });
  
  return Preschool;
}