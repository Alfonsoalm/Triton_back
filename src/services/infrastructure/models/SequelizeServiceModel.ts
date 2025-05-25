// Assuming this file is for your Service model, e.g., src/infrastructure/sequelize/models/service.ts

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../_config/connection"; 

class SequelizeServiceModel extends Model {}

SequelizeServiceModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    reference: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Service",
    tableName: "services",
    timestamps: false,
  }
);

export default SequelizeServiceModel; 