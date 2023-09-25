const bcrypt = require("bcrypt");
const db = require("../db");
const salt = 10;
const jwt = require("jsonwebtoken");

const userController = {};

userController.signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    console.log("USERNAME", username);
    console.log("password", password);
    console.log("email", email);
    if (
      username === undefined ||
      password === undefined ||
      email === undefined
    ) {
      res.locals.newClient = { message: "All input fields required" };
      return next();
    }
    let hashedPassword = await bcrypt.hash(password, salt);

    // select entered email and username from database to check duplicates
    const usernameQuery = `SELECT * FROM clients WHERE username = '${username}'`;
    const emailQuery = `SELECT * FROM clients WHERE email = '${email}';`;
    const usernameResult = await db.query(usernameQuery);
    const emailResult = await db.query(emailQuery);

    if (emailResult.row) {
      res.locals.newClient = { message: "Email already in use" };
    } else if (usernameResult.row) {
      res.locals.newClient = { message: "Username already exist" };
    } else {
      const createQuery = `INSERT INTO clients ( username, password, email) VALUES ('${username}','${hashedPassword}','${email}');`;
      const create = await db.query(createQuery);
      console.log("creating new client", create);
      res.locals.newClient = { message: "Client created" };
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
    const passwordQuery = `SELECT client_id, username, password FROM clients WHERE username = '${input}' OR email = '${input}';`;
    const passwordResult = await db.query(passwordQuery);
    
    // need to check if passwordResult.rows[0] is defined? if not, return username/email does not exist
    const clientID = passwordResult.rows[0].client_id;
    const username = passwordResult.rows[0].username;

    const verified = await bcrypt.compare(
      password,
      passwordResult.rows[0].password
    );

    if (!verified) {
      res.locals.result = {
        verified: verified,
        message: "Incorrect information entered",
      };
    } else {
      // After successful login, store client id in httpOnly cookie to prevent access from DOM action
      const jwtToken = jwt.sign(
        { client_id: clientID },
        process.env.TOKEN_SECRET
      );
      res.cookie("token", jwtToken, { httpOnly: true, secure: true });
      // username is less sensitive (public info)? So it's saved directly in cookie for verification
      res.cookie("username", username, { httpOnly: true, secure: true });
      res.locals.result = { verified: verified, message: "login successfully" };

      // update last_login time
      const loginQuery = `UPDATE clients SET last_login = NOW()
        WHERE client_id = '${clientID}';`
      await db.query(loginQuery);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.getUserInfo = async (req, res, next) => {
  try {
    const jwtToken = req.cookies.token;
    // retrieve instances based the clien_id in JWT token
    jwt.verify(jwtToken, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) return res.sendStatus(403);

      const userQuery = `SELECT username FROM clients WHERE client_id = '${user.client_id}';`;
      const userResult = await db.query(userQuery);
      const username = userResult.rows[0].username
      res.locals.userInfo = username;
      return next();
    });
  } catch (err) {
    return next(err);
  }
};

userController.logout = async (req, res, next) => {
  try {
    const username = req.cookies.username;
    const loginQuery = `UPDATE clients SET last_logout = NOW()
        WHERE username = '${username}';`
      await db.query(loginQuery);
    return next();
  }
  catch(err) {
    return next(err);
  }
}

module.exports = userController;
