"use strict";

describe("The time filter", function () {
  var lng = "fr", filter;

  beforeEach(function () {
    var TimeFilter = require("./time_filter");
    filter = new TimeFilter(lng);
  });

  it("should be defined", function () {
    filter.should.be.defined;
  });

  it("should convert the given date into a moment", function () {
    filter(new Date(2000, 11, 4, 15, 15, 0, 0)).should.equal("04/12/2000");
  });
});