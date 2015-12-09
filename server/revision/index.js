var revisionMap = {};

function revision(key) {
  return revisionMap[key] || key;
}

module.exports.register = function (map, app) {
  revisionMap = require(map);
  app.locals.revision = revision
};