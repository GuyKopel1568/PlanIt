// Checks if a field is a non-empty string
function isRequiredString(field, value) {
  return typeof value === 'string' && value.trim().length > 0
    ? null
    : `${field} is required and must be a non-empty string`;
}

// Validates email format using regex
function isValidEmail(email) {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email) ? null : 'Invalid email format';
}

// Checks if password meets minimum length requirement
function isStrongPassword(password) {
  return password.length >= 8 ? null : 'Password must be at least 8 characters';
}

// Checks if password and confirmPassword match
function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword ? null : 'Passwords do not match';
}

// Checks for forbidden characters in a string
function containsForbiddenChars(field, value) {
  const forbidden = /[<>\\/"'%;(){}]/;
  return value && forbidden.test(value)
    ? `${field} contains forbidden characters`
    : null;
}

// Main middleware function for validating user registration
module.exports = function validateUserRegistration(req, res, next) {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    username,
    dob,
    phone,
    address,
    city,
    state,
  } = req.body;

  const errors = [];

  // Check required fields for non-empty strings
  ['email', 'password', 'confirmPassword', 'username'].forEach((field) => {
    const err = isRequiredString(field, req.body[field]);
    if (err) errors.push(err);
  });

  // Validate email format
  const emailErr = isValidEmail(email);
  if (emailErr) errors.push(emailErr);

  // Validate password strength
  const passwordErr = isStrongPassword(password);
  if (passwordErr) errors.push(passwordErr);

  // Check if passwords match
  const matchErr = passwordsMatch(password, confirmPassword);
  if (matchErr) errors.push(matchErr);

  // Check for forbidden characters in specified fields
  const charChecks = [
    ['username', username],
    ['firstName', firstName],
    ['lastName', lastName],
    ['address', address],
    ['city', city],
    ['state', state],
  ];

  charChecks.forEach(([field, value]) => {
    const err = containsForbiddenChars(field, value);
    if (err) errors.push(err);
  });

  // If any errors, return 400 with error messages
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Sanitize and trim input fields before proceeding
  req.body.email = email.trim();
  req.body.username = username.trim();
  req.body.password = password.trim();
  req.body.confirmPassword = undefined;

  next();
};
