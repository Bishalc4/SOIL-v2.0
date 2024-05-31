module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();
  
    // select all users
    router.get("/", controller.all);

    // Create a new user
    router.post("/", controller.create);

    // Select a single user with username
    router.get("/select/:username", controller.one);

    // Update a user with username
    router.put("/select/:username", controller.update);

    // Select one user from the database if username and password are a match.
    router.get("/login", controller.login);

    // Delete a user with username
    router.delete("/delete/:username", controller.delete);
  
    // Add routes to server.
    app.use("/api/users", router);
  };