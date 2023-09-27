const db = require('../db');
const fetch = require("node-fetch");
const nodeMailer = require('nodemailer');


const alertController = {};

//gets specific users alert setting criteria
alertController.getCriteria = async (req, res, next) => {
  console.log('in getCriteria');
  const username = 'JASON2';
  const query = `SELECT depth_preference FROM clients WHERE username = '${username}'`;
  try {
    console.log('in try block of get criteria');
    const result = await db.query(query);
    res.locals.preference = result.rows[0].depth_preference;
    console.log(res.locals.preference);
    return next();
  } catch (err) {
    console.log(err);
  }
};

//checks incoming query against user alert settings
alertController.calculate = (req, res, next) => {
  console.log('inside calculate middleware');
  const { preference } = res.locals;
  const { queryObj } = req.body;

  //check if the depth of the incoming query is larger than the preference
  if (queryObj.depth >= preference) {
    res.locals.send = {
      isViolation: true,
      type: 'depth',
      query: queryObj,
    };
  }
  return next();
};

alertController.sendEmail = async (req, res, next) => {
  console.log('inside send email');
  if (res.locals.send !== undefined) {
    //Send email here

    console.log('violation found');
  } else {
    console.log('no violation found');
  }

  return next();
};



module.exports = alertController;