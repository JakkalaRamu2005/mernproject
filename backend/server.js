const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const app = express();
app.use(cookieParser());
app.use(
    express.json()
)

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
// app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`)
})




















// const express = require('express');
// const app = express();
// app.use(
//     express.json()
// )
// const mysql = require('mysql2');
// const path = require('path');
// const { open } = require('sqlite');
// const sqlite3 = require('sqlite3');

// /*
// -> to connect to the mysql server
// -> we need to create a db
// -> then we need to create a table
// -> is to perform crud operations
// */
// let db = null;
// const dbPath = path.join(__dirname, 'newdb.db')
// const initDbAndServer = async () => {

//     try {
//         db = await open({
//             filename: dbPath,
//             driver: sqlite3.Database
//         })

//         app.listen(3006, () => {
//             console.log("Server is running at http://localhost:3006/")
//         })

//     } catch (error) {
//         console.error("Error initializing database:", error.message);
//         process.exit(1);
//     }
// }


// initDbAndServer();


// const convertDbObjectToResponseObject = (dbObject) => {
//     return {
//         id: dbObject.id,
//         name: dbObject.name,
//         age: dbObject.age,
//         course : dbObject.course,
//     }
// }


// // get all students API
// app.get('/students/', async (request, response) => {
//     const getStudentsQuery = `SELECT * FROM students;`;
//     const students = await db.all(getStudentsQuery);
//     response.send(students.map(convertDbObjectToResponseObject));
// });