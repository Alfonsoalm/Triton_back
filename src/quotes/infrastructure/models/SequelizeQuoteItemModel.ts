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
  type: {
      type: DataTypes.ENUM("product", "service", "other"),
      allowNull: true,
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
}, {
  sequelize,
  modelName: "QuoteItems",
  tableName: "quote_items",
  timestamps: false,
});

export default SequelizeQuoteItemModel;