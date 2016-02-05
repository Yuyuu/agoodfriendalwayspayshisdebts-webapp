'use strict';

module.exports.serve = (request, response) => {
  response.render('templates/' + request.params[0]);
};
