const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const db = require("./src/database");
const graphql = require("./src/graphql");

// Sync the database
db.sync();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Restful API for the SOIL website!" });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
  })
);

// Add routes
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/product.routes.js")(express, app);
require("./src/routes/review.routes.js")(express, app);
require("./src/routes/cart.routes.js")(express, app);

// Set port, listen for requests
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
