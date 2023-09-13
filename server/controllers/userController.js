const bcrypt = require('bcrypt');
const db = require('../db');
const salt = 10;
const jwt = require('jsonwebtoken');

const userController = {};

userController.signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.locals.newClient = { message: 'All input fields required'};
      return next();
    }
    let hashedPassword = await bcrypt.hash(password, salt);

    const usernameQuery = `SELECT * FROM clients WHERE username = '${username}'`;
    const emailQuery = `SELECT * FROM clients WHERE email = '${email}';`;
    const usernameResult = await db.query(usernameQuery);
    const emailResult = await db.query(emailQuery);
 
    if (emailResult.row) {
      res.locals.newClient = { message: 'Email already in use' };
    } else if (usernameResult.row) {
      res.locals.newClient = { message: 'Username already exist' };
    } else {
      const createQuery = `INSERT INTO clients ( username, password, email) VALUES ('${username}','${hashedPassword}','${email}');`
      const create = await db.query(createQuery);
      console.log('creating new client', create);
      res.locals.newClient = { message: 'Client created' };
    }
    return next();
  } catch (err) {
    return next(err);
  }
};


userController.login = async (req, res, next) => {
  try {
    // input takes username or email
    const { input, password } = req.body;
    const passwordQuery = `SELECT client_id, password FROM clients WHERE username = '${input}' OR email = '${input}';`;
    const passwordResult = await db.query(passwordQuery);
    const clientID = passwordResult.rows[0].client_id;

    const verified = await bcrypt.compare(password, passwordResult.rows[0].password);

    if (!verified) {
      res.locals.result = {verified: verified, message: "You do not have access, please try again"}
    } else {
      const jwtToken = jwt.sign({client_id: clientID}, process.env.TOKEN_SECRET);
      
      res.cookie('token', jwtToken, { httpOnly: true, secure: true });
      res.locals.result = {verified: verified, message: "login successfully"}
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;
