import "dotenv/config"
import mysql2 from "mysql2/promise"

const mySqlPool = mysql2.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DB,
})

export const connect_db = () => {
    mySqlPool.query('SELECT 1')
        .then(() => {
            console.log('my-sql database connected')
        }).catch((err) => {
            console.error(err)
        })
}

export default mySqlPool