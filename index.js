require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const dbConnection = require("./config/dbConnection");
const app = express();
app.use(express.json());
const port = 3000;
dbConnection();
app.use("/", routes);

app.listen(port, () => {
  console.log("server is running at port 3000");
});
