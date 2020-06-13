const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

//routes
const paymentRoutes = require("./routes/payment.routes");

//database config
require("./db");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: true, credentials: true }));

const PORT = process.env.PORT || 5000;

//routes
app.use("/api/payment", paymentRoutes);

//listen
app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});
