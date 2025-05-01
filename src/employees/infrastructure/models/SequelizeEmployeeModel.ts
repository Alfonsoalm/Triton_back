import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../_config/connection";


export class SequelizeEmployeeModel extends Model {}

SequelizeEmployeeModel.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: true,
        unique: true,
    },
    mail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "manager", "staff", "intern"),
      allowNull: true,
    },
    hire_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_center: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "employees",
    timestamps: false,
  }
);

export default SequelizeEmployeeModel;
