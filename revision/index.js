var mapToUse = {};

function revision(key) {
  return mapToUse[key] || key;
}

module.exports = {
  initMap: function (map) {
    mapToUse = map;
  },
  registerAppHelper: function (app) {
    app.locals.revision = revision;
  }
};