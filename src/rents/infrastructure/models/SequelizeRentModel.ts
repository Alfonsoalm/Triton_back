import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeRentModel extends Model {}

SequelizeRentModel.init({
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    id_contact: {
        type: DataTypes.STRING(36),
        allowNull: false,
    },
    begin_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    observations: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending','approved','rejected'),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Rent',
    tableName: 'rents',
    timestamps: false,
});

export default SequelizeRentModel;