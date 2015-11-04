"use strict";

var moment = require("moment");

/* @ngInject */
function TimeFilter(lng) {
  return function (time) {
    return moment(time).locale(lng).calendar();
  };
}

module.exports = TimeFilter;
