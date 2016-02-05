'use strict';

var i18n = require('i18next');

exports.index = (request, response) => {
  response.render('index', {
    title: i18n.t('app.title'),
    description: i18n.t('app.description'),
    twitter_account: i18n.t('app.twitter_account')
  });
};
