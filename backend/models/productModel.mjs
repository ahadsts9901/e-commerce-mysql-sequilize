import { DataTypes } from 'sequelize';

const productModel = (sequelize) => {

    const Product = sequelize.define("products", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }

    }, { timestamps: false });

    return Product;
};

export default productModel;