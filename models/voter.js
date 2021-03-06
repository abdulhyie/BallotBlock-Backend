'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Election, { through: 'RegisteredVoter' })
    }
    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }
  };
  Voter.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notNull: {
          msg: "UUID can't be NULL."
        },
        notEmpty: {
          msg: "UUID can't be empty."
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Firstname can't be NULL."
        },
        notEmpty: {
          msg: "Firstname can't be empty."
        },
        isAlpha: {msg: "Invalid first name."},
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Lastname can't be NULL."
        },
        notEmpty: {
          msg: "Lastname can't be empty."
        },
        isAlpha: {msg: "Invalid last name."},
      }  
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email can't be NULL."
        },
        notEmpty: {
          msg: "Email can't be empty."
        },
        isEmail: {
          msg: "Email is not valid."
        }
      }
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password can't be NULL."
        },
        notEmpty: {
          msg: "Password can't be empty."
        }
      }
    },
    cnic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "CNIC can't be NULL."
        },
        notEmpty: {
          msg: "CNIC can't be empty."
        },
        isNumeric: {
          msg: "Invalid CNIC"
        },
        checkLength(value) {
          if (value.length != 13) {
            throw new Error("Invalid CNIC");
          }
        }
      }
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date of Birth can't be NULL."
        },
        notEmpty: {
          msg: "Date of Birth can't be empty."
        },
        isBefore: {
          args: [new Date().toString()],
          msg: "Invalid Date"
        }
      }
    },
    permanentAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address can't be NULL."
        },
        notEmpty: {
          msg: "Address can't be empty."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'voters',
    modelName: 'Voter',
  });
  return Voter;
};