const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const { config } = require("dotenv");
const ParseToken = require("./middleware/ParseToken");
const cors = require("cors");
const { AuthController } = require("./controllers/AuthController");

config({
  path: path.join(__dirname, "./.env"),
});

mongoose.connect(process.env.MONGODB_URI, () =>
  console.log("Connected to database")
);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(ParseToken);

app.get("/api/auth/init", AuthController.init);
app.post("/api/auth/login", AuthController.login);
app.post("/api/auth/register", AuthController.register);

const port = process.env.NODE_PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
