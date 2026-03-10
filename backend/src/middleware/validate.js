const { validationResult, check } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};


 const registerValidation = [
  check("userName", "Username is required").not().isEmpty(),

  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be 6 or more characters").matches(/^.{6,}$/),
  check("phone", "Phone number is required").not().isEmpty(),
  validate,
];

module.exports = {
    registerValidation
}