import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../_config/connection";

class SequelizeProductModel extends Model {}

SequelizeProductModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    id_supplier: {
      type: DataTypes.STRING(36),
      allowNull: true,
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
    id_center: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0, // Set a default value if needed
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "product",
    timestamps: false,
  }
);

export default SequelizeProductModel;
