import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../_config/connection";

export class UserModelSequelize extends Model {}

UserModelSequelize.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default UserModelSequelize;
