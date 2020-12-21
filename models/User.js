const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Create instance method to compare users plain text pw to hash in db
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }

  toJSON() {
    const user = { ...this.get() };
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.id;
    return user;
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allo: false,
      unique: true,
      // validates correct e-mail format e.g. user@domain.com
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // Miniumin pw lenght of 8
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // hook will run before creation of user to encrypt password beofre sent to db
      beforeCreate: async (newUserData) => {
        // eslint-disable-next-line no-param-reassign
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'user',
  },
);

module.exports = User;
