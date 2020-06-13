const mysql = require("mysql2/promise");
require("dotenv").config();

// create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

// crear archivo .env en el directorio raiz para probar la aplicacion localmente

// DB_HOST=localhost
// DB_USER=root
// DB_PASS=021295
// DB_PORT=3306
// DB_NAME=taller3
// JWT_SECRET=randomsecretvalue
