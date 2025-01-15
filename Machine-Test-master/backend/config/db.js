const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'Root', // Your MySQL password
  database: 'product_database', // The database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports = connection;