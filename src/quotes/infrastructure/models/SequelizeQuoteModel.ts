import { Model, DataTypes } from "sequelize";
import { sequelize } from '../../../_config/connection';

class SequelizeQuoteModel extends Model {}

SequelizeQuoteModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_contact: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM("cash", "credit_card", "bank_transfer", "paypal"),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: "Quotes",
  tableName: "quotes",
  timestamps: false,
});

export default SequelizeQuoteModel;