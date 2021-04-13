const addStuff = (a, b) => a + b;
const aString = 'hi, I have camelCase in my string!';
const myURL = 'localhost';
const snake_case = 'this is a variable with sanke_case';

/**
 * Here is a comment that has camelCase in it.
 */

function myFunction(a, b) {
  const ts = Date.now().toString(); // example where a 3rd party method has camelCase
  console.log(ts, a, b);
}

module.exports = {
  addStuff,
  aString,
  myURL,
  myFunction,
};
