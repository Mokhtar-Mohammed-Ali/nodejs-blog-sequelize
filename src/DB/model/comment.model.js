import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection.db.js';
import { Post } from './post.model.js';
import { user } from './user.model.js';

export class Comment extends Model {}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id'
        }
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
    modelName: 'comment',
    timestamps: true
});
