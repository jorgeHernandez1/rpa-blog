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
// Update Post
router.put('/', async (req, res) => {
  try {
    const updatedBlog = await BlogPost.update({
      title: req.body.title,
      post_body: req.body.post_body,
    },
    {
      where: {
        id: req.body.post_id,
      },
    });

    if (!updatedBlog) {
      res.status(404).json({ message: 'Blog Post not found. Try again.' });
    }
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
