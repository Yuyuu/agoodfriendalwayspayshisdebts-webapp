"use strict";

/* @ngInject */
function InlineElementDirective($parse) {
  return {
    restrict: "A",
    link: link
  };

  function link(scope, element, attributes) {
    var pieces = attributes.debtsInlineData.split(";");
    var pathToArray = pieces[0];
    var property = pieces.length > 1 ? pieces[1] : undefined;

    var getArrayFrom = $parse(pathToArray);

    scope.$watchCollection(pathToArray, function (value) {
      if (value) {
        var array = getArrayFrom(scope);
        if (property) {
          array = array.map(function (object) {
            return object[property];
          });
        }
        element.text(array.join(", "));
      }
    });
  }
}

module.exports = InlineElementDirective;
