const router = require('express').Router();
// Set user routes to user-routes folder
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;
