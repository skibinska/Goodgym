const addToDatabase = require('../database/db-add-run');

const postRun = (req, res) => {
  const body = req.body;
  addToDatabase(body, (err, body) => {
    if (err) {
      console.log(err);
      res.send('POST request not made!');
    } else {
      res.send('run added to database');
    }
  });
};

module.exports = postRun;
