module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();
  
    router.get("/", controller.all);

    router.get("/select/:id", controller.one);

    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/api/users", router);
  };