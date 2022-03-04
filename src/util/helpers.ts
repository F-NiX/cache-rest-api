/**
 * @module util/helpers/general
 * @requires config
 * @requires util/errors
 * @description This module provides general helper functions that (subjectively) do not have another place to go
 * @returns {Object}
 */

/**
 * @function
 * @description Returns a 10-character unix timestamp string
 * @returns {String}
 */
const currentUnixTime = function() {
  return Math.floor(+new Date() / 1000).toString();
};

const uniqueKey = function() {
  return new Date().getTime().toString(36).substring(0, 6) + Math.random().toString(36).substring(2, 6);
};

function generateRandomString(length = 48) {
  let result = "", seeds;
  for (let i = 0; i < length - 1; i++) {
    seeds = [
      Math.floor(Math.random() * 25) + 65,
      Math.floor(Math.random() * 25) + 97
    ];
    result += String.fromCharCode(seeds[Math.floor(Math.random() * 2)]);
  }
  return result;
}

/**
 * @function
 * @description Returns a random number
 * @param {Number} [length=1] Number of digits in the generated number
 * @returns {Number}
 */
const generateRandomNumber = function(length) {
  if (!length) {
    length = 1;
  }
  let result = "";
  const possible = "123456789";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return parseInt(result);
};

export default {
  uniqueKey,
  currentUnixTime,
  generateRandomNumber,
  generateRandomString
};
