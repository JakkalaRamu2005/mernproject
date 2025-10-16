const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',           // 👈 your MySQL username
    password: process.env.DB_PASS, // 👈 your MySQL password (check it)
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = db;
