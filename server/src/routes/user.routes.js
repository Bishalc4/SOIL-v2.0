module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();
  
    router.get("/", controller.all);  // select all users.

    router.get("/select/:username", controller.one);  // Select a single user with id.

    router.get("/login", controller.login);      // Select one user from the database if username and password are a match.

    router.post("/", controller.create);        //  Create a new user.

    router.delete("/delete/:username", controller.delete);      // Delete a user with username
  
    // Add routes to server.
    app.use("/api/users", router);
  };