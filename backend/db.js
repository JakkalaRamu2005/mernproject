const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',           // 👈 your MySQL username
    password: "MYSQL@2024!Ramu#", // 👈 your MySQL password (check it)
    database: "newdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = db;
