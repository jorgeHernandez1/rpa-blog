const router = require('express').Router();
const { User } = require('../../models');

// Create New User
router.post('/', async (req, res) => {
  try {
    // Create user in db
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up session with LoggedIn variable set to true
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Login

// Log Out

module.exports = router;
