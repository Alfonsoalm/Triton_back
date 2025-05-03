import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../databases'

export class RefreshTokenModelSequelize extends Model {}

RefreshTokenModelSequelize.init({
    refreshToken: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true, 
    },
    userId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'RefreshTokens',
    timestamps: false, 
});
