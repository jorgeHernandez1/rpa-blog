const router = require('express').Router();
const { User } = require('../../models');

// Create New User
router.post('/', async (req, res) => {
  try {
    // Create user in db
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up session with LoggedIn variable set to true
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(userData.toJSON());
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    // Check to make sure user exists in db
    if (!userData) {
      res.status(400).json({ message: 'Invalid email or password. Please try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    // Check to make sure password is correct
    if (!validPassword) {
      res.status(400).json({ message: 'Invalid email or password. Please try again.' });
      return;
    }
    // Open and save db session with logged in varaibles
    req.session.save(() => {
      req.session.loggedIn = true;
      req.email = userData.email;

      res.status(200).json({ user: userData, message: 'You are now logged in.' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Log Out

module.exports = router;
