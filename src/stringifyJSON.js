// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  // IOCE
  // Input : some input.
  // Three base cases: 1) primitive value (string or number) 2) array 3) object
  // Output : string value of input
  // Constraints:
  // edge cases: an empty array or object; if we encounter "underfined" or Function, we should
  // return omit it when input is object or return null when input is array;
  // e.g {a: function () {}} --> {}; [function () {}, 1] --> [null, 1]
  var resultString = '';

  //Check if the object type
  if (obj === undefined || typeof obj === 'function') {
    resultString = undefined;
  } else if (typeof obj === 'string') {
    resultString = resultString + '"' + obj + '"';
  } else if (typeof obj !== 'object' || obj === null) {
    resultString = resultString + obj;
  }

  if (typeof obj === 'object' && Array.isArray(obj)) {
    //When it is an array
    if (obj.length === 0) {
      resultString = resultString + '[]';
    } else {
      resultString = resultString + '[';
    }
    for (var i = 0; i < obj.length; i++) {
      var newItem = stringifyJSON(obj[i]);
      if (newItem === undefined) {
        newItem = null;
      }
      if (i === obj.length - 1) {
        resultString = resultString + newItem + ']';
      } else {
        resultString = resultString + newItem + ',';
      }
    }
  } else if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    //When it is an object
    if (Object.keys(obj).length === 0) {
      resultString = resultString + '{}';
    } else {
      resultString = resultString + '{';
    }
    for (var key in obj) {
      if (Object.keys(obj)[Object.keys(obj).length - 1] === key) {
        if (stringifyJSON(obj[key]) === undefined) {
          if (resultString.slice(resultString.length - 1, resultString.length) === ',') {
            resultString = resultString.slice(0, resultString.length - 1) + '}';
          } else {
            resultString = resultString + '}';
          }
        } else {
          resultString = resultString + '"' + key + '"' + ':' + stringifyJSON(obj[key]) + '}';
        }
      } else {
        if (stringifyJSON(obj[key]) === undefined) {
          resultString = resultString;
        } else {
          resultString = resultString + '"' + key + '"' + ':' + stringifyJSON(obj[key]) + ',';
        }
      }
    }
  }

  //return the resultString string
  return resultString;
};
