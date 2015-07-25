"use strict";

exports.decorate = function (object) {
  object.watchers = {};

  object.$watch = function (valueToWatch, callback) {
    var valueToWatchIsAFunction = typeof valueToWatch === "function";
    object.watchers[valueToWatchIsAFunction ? valueToWatch.name : valueToWatch] = callback;
  };

  object.change = function (valueToChange, newValue, oldValue) {
    object.watchers[valueToChange].call(null, newValue, oldValue);
  };

  return object;
};