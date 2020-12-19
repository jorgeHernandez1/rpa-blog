const { Model, DataTypes } = require("sequelize");
const Sequelize = require("sequelize");

class BlogPost extends Model {}

BlogPost.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Create reference to user table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "blog_post",
  }
);

module.exports = BlogPost;
