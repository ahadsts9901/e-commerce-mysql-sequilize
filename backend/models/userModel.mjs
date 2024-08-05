import { DataTypes } from 'sequelize';
import { emailPattern, firstNamePattern, lastNamePattern, passwordPattern } from '../core.mjs';

const userModel = (sequelize) => {

    const User = sequelize.define("user", {

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: firstNamePattern
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: lastNamePattern
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                is: emailPattern
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: passwordPattern
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }

    });

    return User;
};

export default userModel;