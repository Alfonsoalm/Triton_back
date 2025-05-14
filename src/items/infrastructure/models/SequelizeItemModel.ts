import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeItemModel extends Model {}

SequelizeItemModel.init({
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
  brand: { // Nueva columna 'brand'
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
}, {
  sequelize,
  modelName: "Item",
  tableName: "items",
  timestamps: false,
});

export default SequelizeItemModel;