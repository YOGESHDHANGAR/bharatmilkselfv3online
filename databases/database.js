if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}
const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: process.env.DB_TIMEZONE,
  max_allowed_packet: 1024 * 1024 * 10,
});

con.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database Connected Successfully!");
  }
});

module.exports = con;
