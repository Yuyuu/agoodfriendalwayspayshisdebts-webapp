"use strict";

function forwardResponseData(response) {
  return response.data;
}

function forwardErrorsIfAny($q, requestPromise) {
  return requestPromise.catch(function (response) {
    var errors = (400 === response.status) ? response.data.errors : [{message: "DEFAULT"}];
    return $q.reject(errors);
  });
}

module.exports = {
  forwardResponseData: forwardResponseData,
  forwardErrorsIfAny: forwardErrorsIfAny
};