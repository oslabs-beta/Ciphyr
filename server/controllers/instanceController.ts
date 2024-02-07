const db = require('../db');
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

interface InstanceController {
  verifyToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  createInstance: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getInstances: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deleteInstance: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const instanceController: InstanceController = {

verifyToken: async (req, res, next) => {

  const jwtToken = req.cookies.token;
  jwt.verify(jwtToken, process.env.TOKEN_SECRET as string, (err: any, user: any) => {

    if (err) return res.sendStatus(403)
    res.locals.client = user;
    return next();
  })
},

createInstance: async (req, res, next) => {
  try {
    const {label} = req.body;
    if (!label) {
      res.locals.instance = { message : 'Label required'};
      return next();
    } else {
      const labelQuery = `SELECT * FROM instance WHERE label = '${label}'`;
      const labelTaken = await db.query(labelQuery);
      // if table is not empty, then check if label is duplicated

      // add: allow different user to use same label
      if (labelTaken.rowCount !== 0) {
        if (labelTaken.rows[0].label === label) {
          res.locals.instance = {message : 'Please use new label'};
          return next();
        }
      }
    }
    const id = res.locals.client.client_id;
    const apiKey = crypto.randomUUID();
    const instanceQuery = `INSERT INTO instance (label, api_key, client_id) VALUES ( '${label}', '${apiKey}','${id}')`;
    const newInstance = await db.query(instanceQuery);
    // send back api key to user once after creation
    res.locals.instance = { message: 'New instance created', apiKey: apiKey};
    return next();
  }

  catch(err) {
    return next(err)
  }
},

getInstances: async (req, res, next) => {
  const jwtToken = req.cookies.token;
  // retrieve instances based the clien_id in JWT token
  jwt.verify(jwtToken, process.env.TOKEN_SECRET as string, async (err: any, user: any) => {

    if (err) return res.sendStatus(403)

    const instanceQuery = `SELECT * FROM instance WHERE client_id = '${user.client_id}';`
    const instanceResult = await db.query(instanceQuery);
    res.locals.showInstance = instanceResult.rows;

    return next();
  })
},

deleteInstance: async (req, res, next) => {
  try {
    const { id }  = req.body;
    const deleteQuery = `DELETE FROM instance WHERE id = ${id}`;
    const result = await db.query(deleteQuery);
    return next();
  }
  catch(err) {
    return next(err);
  }
}

};

module.exports = instanceController;