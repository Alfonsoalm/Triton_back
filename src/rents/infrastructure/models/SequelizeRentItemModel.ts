import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../_config/connection';

class SequelizeRentItemModel extends Model {}

SequelizeRentItemModel.init({
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false,
    },
    rentId: {
        type: DataTypes.STRING(36),
        allowNull: false,
    },
    itemId: {
        type: DataTypes.STRING(36),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
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
}, {
    sequelize,
    modelName: 'RentItem',
    tableName: 'rentItems',
    timestamps: false,
});

export default SequelizeRentItemModel;