import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeBillItemModel extends Model {}

SequelizeBillItemModel.init({
  id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
  },
  bill_id: {
        type: DataTypes.STRING,
        allowNull: false,
  },
  position: {
        type: DataTypes.INTEGER,
        allowNull: false,
  },
  description: {
        type: DataTypes.STRING,
        allowNull: true,
  },
  quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
  },
  unit_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
  },
  item_subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
  },
  item_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
  },
  monetary_units: {
        type: DataTypes.STRING,
        allowNull: false,
  }
}, {
  sequelize,
  modelName: "BillItems",
  tableName: "bill_items",
  timestamps: false,
});

export default SequelizeBillItemModel;