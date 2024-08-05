import { Sequelize } from 'sequelize';
import userModel from './userModel.mjs';

export const sequelize = new Sequelize(process.env.MY_SQL_DB, process.env.MY_SQL_USER, process.env.MY_SQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

export const User = userModel(sequelize);

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((error) => {
        console.error('Error creating database & tables:', error);
    });