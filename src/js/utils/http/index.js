'use strict';

function forwardResponseData(response) {
  return response.data;
}

function forwardErrorsIfAny($q, requestPromise) {
  return requestPromise.catch(response => {
    let errors = response.status === 400 ? response.data.errors : [{message: 'DEFAULT'}];
    return $q.reject(errors);
  });
}

module.exports = {
  forwardResponseData: forwardResponseData,
  forwardErrorsIfAny: forwardErrorsIfAny
};
