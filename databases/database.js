const mysql = require("mysql");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: process.env.DB_TIMEZONE,
});

con.getConnection((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database Connected Successfully!");
  }
});

module.exports = con;
