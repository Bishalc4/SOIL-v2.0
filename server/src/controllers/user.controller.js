const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
    const users = await db.user.findAll();
  
    res.json(users);
};

//select one user from the database
exports.one = async (req, res) => {
    const user = await db.user.findByPk(req.params.username);
  
    res.json(user);
};

// Delete a user with the specified username in the request
exports.delete = async (req, res) => {
  try {
      const username = req.params.username;
      const user = await db.user.findByPk(username);

      if (user) {
          await user.destroy();
          res.status(200).json({ message: `User with username ${username} deleted successfully.` });
      } else {
          res.status(404).json({ message: `User with username ${username} not found.` });
      }
  } catch (error) {
      res.status(500).json({ message: "An error occurred while trying to delete the user."});
  }
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
    const user = await db.user.findByPk(req.query.username);
  
    if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
      // Login failed.
      res.json(null);
    else
      res.json(user);
  };

//create a user in the database
exports.create = async (req, res) => {
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
    
    const user = await db.user.create({
      username: req.body.username,
      password_hash: hash,
      email: req.body.email,
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      joinDate: req.body.joinDate
    });
  
    res.json(user);
};