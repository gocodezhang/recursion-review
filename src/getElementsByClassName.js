// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // your code here
  // IOCE
  // input: HTML class name
  // output: an array of div names whose class is the input class name
  // constraint: every HTML element has nested div and variables changing amount of div
  // edge cases: an HTML with no element; elements without class name
  var resultArr = [];

  var recurse = function (element, className) {
    if (element.classList && element.classList.contains(className)) {
      resultArr.push(element);
    }

    if (element.childNodes.length > 0) {
      for (var i = 0; i < element.childNodes.length; i++) {
        recurse(element.childNodes[i], className);
      }
    }
  };

  recurse(document.body, className);
  return resultArr;



};
