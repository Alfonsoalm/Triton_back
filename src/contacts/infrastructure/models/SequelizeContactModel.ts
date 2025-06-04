import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeContactModel extends Model {}

SequelizeContactModel.init({
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    mail: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
    },
    nif: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
    },
    nif_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('customer','supplier','debtor','creditor'),
        allowNull: true,
    },
    id_account: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    category: {
        type: DataTypes.ENUM('particular', 'professional'),
        allowNull: true,
    },
    access: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    timestamps: false,
});

export default SequelizeContactModel;