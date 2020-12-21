const router = require('express').Router();
// Home routes that serve html pages
const homeRoutes = require('./homeRoutes');
// Set api routes to index routes in api folder
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
