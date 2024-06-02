const { where } = require("sequelize");
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

exports.update = async (req, res) => {
  const username = req.params.username;

  db.user.update({ first_name: req.body.first_name, last_name: req.body.last_name }, {
    where: { username: username}
  })
    .then(num => {
      if (num == 1) {
          res.send({
              message: "User information was update successfully!"
          });
      } else {
          res.send({
              message: `Cannot update User with username=${db.user}. Maybe User was not found!`
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: "Could not delete User with username=" + username
      });
  });
}

exports.updatePassword = async (req, res) => {
    try {
        const username = req.params.username;
        const { old_password, new_password } = req.body.params;

        const user = await db.user.findByPk(username);
        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found.` });
        }

        // Verify the old password
        const isPasswordValid = await argon2.verify(user.password_hash, old_password);
        if (!isPasswordValid) {
            return res.status(200).json(null);
        }

        // Hash the new password
        const newPasswordHash = await argon2.hash(new_password, { type: argon2.argon2id });

        // Update the password in the database
        user.password_hash = newPasswordHash;
        await user.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the password." });
    }
};

exports.followUser = async (req, res) => { 
    try {
        const follow = await db.following.create({
            username: req.body.username,
            following_username: req.body.following_username
        });
        res.json(follow);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while following the user." });
    }
};

exports.followingUsers = async (req, res) => {
    try {
        const username = req.query.username;
        const following = await db.following.findAll({ where: { username: username } });
        res.json(following);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving following users." });
    }
};
 
exports.blocklist = async (req, res) => {
    const blocklist = await db.blocked_user.findAll();
    res.json(blocklist);
};