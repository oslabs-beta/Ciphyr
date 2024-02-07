const db = require('../db');
import { Request, Response, NextFunction } from 'express';

interface LogController {
  getAllLog: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  newLogInfo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const logController: LogController = {

getAllLog: async (req, res, next) => {
  try {
    // retrieve logs from api key provided
    const { apiKey, timezone } = req.body;
    const logQuery = `SELECT * FROM Log WHERE api_key = '${apiKey}'`;
    const clientLogResult = await db.query(logQuery);
    const clientLog = clientLogResult.rows;

    clientLog.forEach((el: any) => {
      el.timestamp = el.timestamp.toLocaleString('en-US', { hour12: false, timeZone: timezone }).replace(',', '')
    })
    res.locals.allLog = clientLog
    return next();
  } catch (err) {
    return next(err);
  }
},

newLogInfo: async (req, res, next) => {
  try {
    const username = req.cookies.username;
    // retrieve logs from api key provided
    const logCountQuery = `SELECT COUNT(*) FROM log l JOIN instance i ON l.api_key = i.api_key
      JOIN clients c ON i.client_id = c.client_id
      WHERE c.username = '${username}' AND l.timestamp > c.last_logout`;
    const logCount = await db.query(logCountQuery);
    res.locals.logCount = logCount.rows[0];
    return next();
  } catch (err) {
    return next(err);
  }
}

};

module.exports = logController;
