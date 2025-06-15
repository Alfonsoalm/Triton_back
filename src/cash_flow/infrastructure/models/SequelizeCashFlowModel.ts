import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeCashFlowModel extends Model {}

SequelizeCashFlowModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    reference_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    _reference_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    _center_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'CashFlow',
    tableName: 'cash_flows',
    timestamps: false,
});

export default SequelizeCashFlowModel;