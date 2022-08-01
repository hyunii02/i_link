module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define("class", {
    class_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    preschool_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    class_name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  { 
  freezeTableName: true,
  timestamps: false,
  });
  
  return Class;
}