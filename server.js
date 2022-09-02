const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Connect To data base
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB connection Successful"));

//Assign Port and connect to a port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listen at port number ${port}`);
});
