const db = require('../db');
const fetch = require('node-fetch');

//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
const alertController = {};

//gets specific users alert setting criteria
alertController.getCriteria = async (req, res, next) => {
  const { queryObj } = req.body;
  //getting depth preference from user, based on their api key sent on req body
  const userQuery = `SELECT c.depth_preference FROM instance AS i JOIN clients AS c ON i.client_id = c.client_id WHERE i.api_key = '${queryObj.api_key}'`;

  try {
    const result = await db.query(userQuery);

    res.locals.preference = result.rows[0].depth_preference;

    return next();
  } catch (err) {
    console.log(err);
  }
};

//checks incoming query against user alert settings
alertController.calculate = (req, res, next) => {
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
  if (res.locals.send !== undefined) {
    const { send } = res.locals;
    //Send email here
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'ajberger905@gmail.com',
      from: 'ciphyr4@gmail.com',
      subject: 'Ciphyr Security Alert',
      text: `A suspicious Query was detected based on your ${
        send.type
      } parameters. We received a query with a ${send.type} of ${
        send.query[send.type]
      }`,
      html: `<strong>A suspicious Query was detected based on your ${
        send.type
      } parameters. We received a query with a ${send.type} of ${
        send.query[send.type]
      }</strong>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });

    console.log('violation found');
  } else {
    console.log('no violation found');
  }

  return next();
};

alertController.update = async (req, res, next) => {
  const { depth } = req.body;
  const { username } = req.cookies;

  const updateQuery = `UPDATE clients SET depth_preference = ${depth} WHERE username = '${username}'`;
  try {
    const result = await db.query(updateQuery);
    return next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = alertController;
