const test = require('node:test');
const assert = require('node:assert/strict');
const { validateEmail, validatePhone, validateContact } = require('../lib/validation');

test('validateEmail - valid email passes', () => {
  assert.equal(validateEmail('mayank.goyal@jecrcu.edu.in'), null);
  assert.equal(validateEmail('student@domain.org'), null);
});

test('validateEmail - invalid formats fail with readable messages', () => {
  assert.notEqual(validateEmail(''), null);
  assert.notEqual(validateEmail('invalid-plain-text'), null);
  assert.notEqual(validateEmail('missing@domain'), null);
  assert.notEqual(validateEmail('@nodomain.com'), null);
});

test('validatePhone - optional and valid checks', () => {
  assert.equal(validatePhone(''), null);
  assert.equal(validatePhone('+91 9876543210'), null);
  assert.equal(validatePhone('0141-2770232'), null);
  assert.notEqual(validatePhone('abc-phone'), null);
});

test('validateContact - complete valid form passes', () => {
  const result = validateContact({
    name: 'Mayank Goyal',
    email: 'mayank.goyal@jecrcu.edu.in',
    phone: '+91 9876543210',
    subject: 'Admissions Inquiry',
    message: 'I would like to inquire about the Web Development course curriculum.'
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateContact - empty fields return detailed per-field errors', () => {
  const result = validateContact({
    name: '',
    email: 'bad-email',
    message: 'short'
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});
