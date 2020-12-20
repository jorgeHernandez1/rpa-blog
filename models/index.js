const User = require('./User');
const BlogPost = require('./BlogPost');

// Set relationships
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
});

// Export all models as an object
module.exports = { User, BlogPost };
