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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  position: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  item_id: {
      type: DataTypes.INTEGER,
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
  unit_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: "QuoteItems",
  tableName: "quote_items",
  timestamps: false,
});

export default SequelizeQuoteItemModel;