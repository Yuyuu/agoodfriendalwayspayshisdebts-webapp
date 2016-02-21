'use strict';

import CurrencySymbolDirective from './currency_symbol_directive';
let expect = require('chai').use(require('sinon-chai')).expect;
let sinon = require('sinon');

describe('The currency symbol directive', () => {
  let element, $locale, directive;

  beforeEach(() => {
    element = {html: sinon.spy()};
  });

  beforeEach(() => {
    $locale = {NUMBER_FORMATS: {CURRENCY_SYM: '$'}};
  });

  beforeEach(() => {
    directive = new CurrencySymbolDirective($locale);
    directive.link(null, element);
  });

  it('should be defined', () => {
    expect(directive).to.be.defined;
  });

  it('should set the currency symbol of the current locale as the text of the element', () => {
    expect(element.html).to.have.been.calledWith('$');
  });
});
