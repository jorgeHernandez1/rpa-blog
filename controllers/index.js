const router = require('express').Router();
// Set api routes to index routes in api folder
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
