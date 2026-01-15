import { DataTypes,Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { user } from './user.model.js';
export class Post extends Model {}
Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'post',
    timestamps: true,
    paranoid: true 
});