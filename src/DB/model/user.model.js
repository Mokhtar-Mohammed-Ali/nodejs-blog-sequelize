import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: { msg: "Must be a valid email" } 
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkPasswordLength(value) {
                if (value.length <= 6) {
                    throw new Error("Password length must be > 6");
                }
            }
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: (userInstance) => {
            if (userInstance.name.length <= 2) {
                throw new Error("Name length must be > 2");
            }
        }
    }
});
