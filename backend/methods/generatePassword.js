const crypto = require('crypto');

function generateRandomPassword(length) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()';

  const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + symbols;

  const randomBytes = crypto.randomBytes(length);
  let generatedPassword = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % allCharacters.length;
    generatedPassword += allCharacters[randomIndex];
  }

  return generatedPassword;
}


// console.log(generateRandomPassword(5));

module.exports = generateRandomPassword