const router = require('express').Router();
const { BlogPost } = require('../../models');
// Create Post
router.post('/', async (req, res) => {
  try {
    const userData = await BlogPost.create({
      title: req.body.title,
      post_body: req.body.post_body,
      user_id: req.session.user_id,
    });
    res
      .status(200)
      .json({ user: userData, message: 'You are now logged in.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
