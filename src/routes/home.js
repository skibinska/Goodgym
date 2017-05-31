require('env2')(`${__dirname}/../../.env`);
const apiKey = process.env.API_KEY;
const getRun = require('../helpers/get-run-from-goodgym');

const home = (req, res) => {
  const paramId = req.params.id;
  if (paramId !== 'favicon.ico') {
    getRun(paramId, (err, run) => {
      if (err) console.error(err);
      res.render('home', {
        run: run,
        apiKey: apiKey
      });
    });
  }
};

module.exports = home;
