const userController = {};
const bcrypt = require('bcrypt');
const db = require('pg');
const salt = 10;

userController.signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    console.log('in the signup');
    let hashedPassword = await bcrypt.hash(password, salt);
    const usernameQuery = `SELECT * FROM clients WHERE username = ${username};`;
    const emailQuery = `SELECT * FROM clients WHERE email = ${email};`;
    const usernameResult = await db.query(usernameQuery);
    const emailResult = await db.query(emailQuery);

    console.log('usernameresult', usernameResult);
    console.log('emailresult', emailResult);

    if (emailResult) {
      res.locals.newClient = { message: 'Email already in use' };
    } else if (usernameResult) {
      res.locals.newClient = { message: 'Client already exist' };
    } else {
      const createQuery = `INSERT INTO clients ( username, password, email) VALUES ('${username}','${hashedPassword}','${email}')`;
      const create = await db.query(createQuery);
      console.log(create);
      res.locals.newClient = { message: 'Client created' };
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const passwordQuery = `SELECT password FROM clients WHERE username = ${username};`;
    const passwordResult = await db.query(passwordQuery);
    const validPassword = bcrypt.compare(password, passwordResult);
    if (validPassword) {
      res.locals.verified = true;
    } else {
      res.locals.verified = false;
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;
