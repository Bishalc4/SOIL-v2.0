const db = require("../database");
const argon2 = require("argon2");

exports.all = async (req, res) => {
    const users = await db.user.findAll();
  
    res.json(users);
};

//select one user from the database
exports.one = async (req, res) => {
    const user = await db.user.findByPk(req.params.id);
  
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