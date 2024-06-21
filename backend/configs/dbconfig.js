const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "databaseuser1",
  database: "test",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
});

module.exports = connection;
