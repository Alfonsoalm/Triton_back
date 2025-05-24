import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeBillModel extends Model {}

SequelizeBillModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    bill_ref: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    bill_type: {
        type: DataTypes.ENUM("quote", "rent", "other"),
        allowNull: false,
    },
    doc_ref: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    customer_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,        
    },
    deposit: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    monetary_units: {
        type: DataTypes.STRING(5),
        allowNull: true,
    },
    payment_method: {
        type: DataTypes.ENUM("cash", "credit_card", "bank_transfer", "paypal"),
        allowNull: true,
    },
    payment_status: {
        type: DataTypes.ENUM("paid", "not paid"),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Bill',
    tableName: 'bills',
    timestamps: false,
});

export default SequelizeBillModel;