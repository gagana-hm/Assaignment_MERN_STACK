const { checkSchema } = require("express-validator");
const { isEmailInUse, isPhoneInUse } = require("./databaseValidator");

const employeeSchema = checkSchema({
  name: {
    notEmpty: {
      bail: true,
      errorMessage: "Name cannot be empty",
    },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: "Name should be between 2 and 50 characters",
    },
  },
  email: {
    notEmpty: {
      bail: true,
      errorMessage: "Email cannot be empty",
    },
    isEmail: {
      errorMessage: "Please provide a  valid email address",
    },
    normalizeEmail: true,
    custom: {
      options: async (value) => {
        const trimmedEmail = value.trim();
        const emailExists = await isEmailInUse(value);
        if (emailExists) {
          return Promise.reject("Email is already in use");
        }
      },
    },
  },
  mobile: {
    notEmpty: {
      bail: true,
      errorMessage: "Mobile number cannot be empty",
    },
    isMobilePhone: {
      errorMessage: "Please provide a valid mobile phone number",
    },
    custom: {
      options: async (value) => {
        const phoneExists = await isPhoneInUse(value);
        if (phoneExists) {
          return Promise.reject("Mobile number is already in use");
        }
      },
    },
  },
  designation: {
    notEmpty: {
      bail: true,
      errorMessage: "Designation cannot be empty",
    },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: "Designation should be between 2 and 50 characters",
    },
  },
  gender: {
    notEmpty: {
      bail: true,
      errorMessage: "Gender cannot be empty",
    },
    isIn: {
      options: [["M", "F"]],
      errorMessage: "Gender must be Male, Female, or Other",
    },
  },
  course: {
    notEmpty: {
      bail: true,
      errorMessage: "Course cannot be empty",
    },
  },
});

module.exports = {
  employeeSchema,
};
