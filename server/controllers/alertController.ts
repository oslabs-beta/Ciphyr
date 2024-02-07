const db = require('../db');
import { Request, Response, NextFunction } from 'express';

interface AlertController {
  getCriteria: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  calculate: (req: Request, res: Response, next: NextFunction) => void;
  sendEmail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const alertController: AlertController = {

//gets specific users alert setting criteria
 getCriteria: async (req: Request, res: Response, next: NextFunction) => {
  const { queryObj } = req.body;
  //getting depth preference from user, based on their api key sent on req body
  const userQuery = `SELECT c.depth_preference FROM instance AS i JOIN clients AS c ON i.client_id = c.client_id WHERE i.api_key = '${queryObj.api_key}'`;

  try {
    const result = await db.query(userQuery);
    res.locals.preference = result.rows[0].depth_preference;
    return next();
  } catch (err) {
    console.log(err);
    next(err)
  }
},

//checks incoming query against user alert settings
 calculate: (req: Request, res: Response, next: NextFunction) => {
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
},

 sendEmail: async (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.send !== undefined) {
    const { send } = res.locals;
    //Send email here
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'ajberger905@gmail.com',
      from: 'ciphyr4@gmail.com',
      subject: 'Ciphyr Security Alert',
      text: `A suspicious Query was detected based on your ${send.type} parameters. We received a query with a ${send.type} of ${send.query[send.type]}`,
      html: `<strong>A suspicious Query was detected based on your ${send.type} parameters. We received a query with a ${send.type} of ${send.query[send.type]}</strong>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error: Error) => {
        console.error(error);
      });

    console.log('violation found');
  } else {
    console.log('no violation found');
  }

  return next();
},

 update: async (req: Request, res: Response, next: NextFunction) => {
  const { depth } = req.body;
  const { username } = req.cookies;

  const updateQuery = `UPDATE clients SET depth_preference = ${depth} WHERE username = '${username}'`
  try {
    const result = await db.query(updateQuery);
    return next()
  } catch (err) {
    console.log(err)
    next(err)
  }
}

};


export default alertController;
