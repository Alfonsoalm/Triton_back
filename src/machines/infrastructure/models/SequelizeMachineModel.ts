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
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  deposit: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: "Machine",
  tableName: "machines",
  timestamps: false,
});

export default SequelizeMachineModel;