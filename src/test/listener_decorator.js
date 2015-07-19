"use strict";

exports.decorate = function (object) {
  object.listeners = {};

  object.on = function (event, callback) {
    this.listeners[event] = callback;
  };

  object.$on = object.on;

  object.emit = function (event) {
    this.listeners[event].call(null);
  };

  return object;
};