const router = require('express').Router();
// Set user routes files
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes.js');

router.use('/users', userRoutes);
router.use('/blogPost', blogPostRoutes);

module.exports = router;
