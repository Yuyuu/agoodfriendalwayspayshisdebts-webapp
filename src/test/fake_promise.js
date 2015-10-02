"use strict";

function TestPromise(fn, callbackResult, chainPromises) {
  this.function = fn;
  this.callbackResult = callbackResult;
  this.chainPromises = chainPromises || [];
}

TestPromise.prototype.then = function (callback, fn) {
  fn = fn || "then";
  if (fn === this.function) {
    callback.call(this, this.callbackResult);
    var nextPromise = this.chainPromises.shift();
    if (nextPromise) {
      nextPromise.chainPromises = this.chainPromises;
      return nextPromise;
    }
  }
  return this;
};

TestPromise.prototype.catch = function (callback) {
  return this.then(callback, "catch");
};

TestPromise.prototype.finally = function (callback) {
  return this.then(callback, "finally");
};

module.exports = TestPromise;