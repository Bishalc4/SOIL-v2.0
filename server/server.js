const express = require("express");
const cors = require("cors");
const db = require("./src/database");

db.sync();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

//Add routes
require("./src/routes/user.routes.js")(express, app);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

