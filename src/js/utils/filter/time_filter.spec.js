"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The time filter", function () {
  var lng = "fr", filter;

  beforeEach(function () {
    var TimeFilter = require("./time_filter");
    filter = new TimeFilter(lng);
  });

  it("should be defined", function () {
    expect(filter).to.be.defined;
  });

  it("should convert the given date into a moment", function () {
    expect(filter(new Date(2000, 11, 4, 15, 15, 0, 0))).to.equal("04/12/2000");
  });
});