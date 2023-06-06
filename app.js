const app = require("./childapp");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
});

// Config
require("dotenv").config({ path: "config/config.env" });

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port: ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
});
