const { Admin } = require('../database/db-connection');

const postLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.session, 'req.session');
  Admin.findOne({username: username, password: password}, (err, admin) => {
    if (err) {
      console.log(err);
      return res.status(500).send('POST request not made!');
    }

    if (!admin) {
      console.log('There is no admin');
      return res.status(404).send('You need to be logged in to see this page');
    }
    console.log(admin, 'admin');
    // req.session.admin = admin;
    return res.status(200).send('Hello admin!');
  });
};

module.exports = postLogin;
