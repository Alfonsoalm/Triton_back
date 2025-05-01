import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeWorklogModel extends Model {}

SequelizeWorklogModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  id_employee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  log_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("in", "out", "break_in", "break_out"),
    allowNull: false,
  },
  observations: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
}, {
  sequelize,
  modelName: "Worklog",
  tableName: "worklogs",
  timestamps: false,
});

export default SequelizeWorklogModel;