import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeMachineModel extends Model {}

SequelizeMachineModel.init({
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
  },
  brand: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },

  serial_number: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  reference: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  daily_rental_price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sale_price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  deposit: {
    type: DataTypes.FLOAT,
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
  
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("available", "repairing", "broken", "rented", "sold"),
    allowNull: false,
  },

  id_supplier: {
    type: DataTypes.STRING(36),
    allowNull: true,
  },
  id_center: {
    type: DataTypes.STRING(36),
    allowNull: true,
  },
  id_owner: {
    type: DataTypes.STRING(36),
    allowNull: true,
  }
}, {
  sequelize,
  modelName: "Machine",
  tableName: "machines",
  timestamps: false,
});

export default SequelizeMachineModel;