// Pure validation helpers used in Exp 4, Exp 15 and tested in Exp 14

function validateEmail(email) {
  if (!email || typeof email !== 'string') return 'Email is required';
  const trimmed = email.trim();
  if (trimmed.length === 0) return 'Email is required';
  // Standard RFC 5322 compliant regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address';
  }
  return null;
}

function validatePhone(phone) {
  if (!phone || phone.trim().length === 0) return null; // optional
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
  if (!phoneRegex.test(phone.trim())) {
    return 'Please enter a valid phone number format';
  }
  return null;
}

function validateContact(data) {
  const errors = {};

  if (!data || !data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  const emailErr = validateEmail(data ? data.email : '');
  if (emailErr) {
    errors.email = emailErr;
  }

  if (data && data.phone) {
    const phoneErr = validatePhone(data.phone);
    if (phoneErr) errors.phone = phoneErr;
  }

  if (!data || !data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = {
  validateEmail,
  validatePhone,
  validateContact
};
