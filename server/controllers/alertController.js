const db = require('../db')

const alertController = {}

alertController.getCriteria = async (req, res, next) => {
  console.log('in getCriteria');
  const username = 'JASON2'
  const query = `SELECT depth_preference FROM clients WHERE username = ${username}`
  try {
    console.log('in try block of get criteria')
    const result = await db.query(query);
    const depthPreference = await result.json();
    res.locals.preference = depthPreference;
    next()
  } catch (err) {
    console.log(err)
  }
}

module.exports = alertController;