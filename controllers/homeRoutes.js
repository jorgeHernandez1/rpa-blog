const router = require('express').Router();
const { User, BlogPost } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('layouts/main', {
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
