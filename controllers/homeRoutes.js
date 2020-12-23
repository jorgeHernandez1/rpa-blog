const router = require('express').Router();
const { User, BlogPost } = require('../models');
// Homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogPosts = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        },
      ],
    });
    // Remove noise from db
    const blogPosts = dbBlogPosts.map((blogPost) => blogPost.get({ plain: true }));
    // render homepage along with main layout
    res.render('homepage', {
      // Pass the logged in flag to the template
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Login
router.get('/login', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }

    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});
// Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      // Redirects users to login if they reach endpoint without being logged in
      res.redirect('/login');
      return;
    }
    // Get all dbPlogPosts for this user
    const dbBlogPostData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // Remove noise from db
    const blogPosts = dbBlogPostData.map((blogPost) => blogPost.get({ plain: true }));
    res.render('dashboard', {
      // Pass the logged in flag to the template
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.json(500).json(err);
  }
});

module.exports = router;
