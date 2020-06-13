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

// DB_HOST=bovdhxjhq6l1k5hh1h4e-mysql.services.clever-cloud.com
// DB_USER=ulatok3gsmv7xxwm
// DB_PASS=LfD1aNGGLptw5p68fnrO
// DB_PORT=3306
// DB_NAME=bovdhxjhq6l1k5hh1h4e
// JWT_SECRET=randomsecretvaluepassenger