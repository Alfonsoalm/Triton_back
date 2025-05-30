import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeQuoteItemModel extends Model {}

SequelizeQuoteItemModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  quote_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("product", "service", "other"),
    allowNull: true,
  },
  item_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  tax: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0.00,
  },

}, {
  sequelize,
  modelName: "QuoteItems",
  tableName: "quote_items",
  timestamps: false,
});

export default SequelizeQuoteItemModel;