import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeBillModel extends Model {}

SequelizeBillModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    bill_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    street: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
    },
    location: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    region: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    mail: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    photo_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Bill',
    tableName: 'bills',
    timestamps: false,
});

export default SequelizeBillModel;