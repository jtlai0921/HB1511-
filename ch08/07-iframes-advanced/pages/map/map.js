// map.js
(function () {
  "use strict";

  function createMap(options) {
    options = options || {};
    options.credentials = options.credentials || "TODO"; // Your Bing API ID here
    options.center = options.center || new Microsoft.Maps.Location(45.523452, -122.676207);
    options.zoom = options.zoom || 10;

    new Microsoft.Maps.Map(map, options);
  }

  function getMessage(e) {
    // double-check the original of the message
    if (e.origin === "ms-appx://" + document.location.host) {
      // recreate the map with the new lat, long pair
      var geocode = JSON.parse(e.data);
      createMap({ center: new Microsoft.Maps.Location(geocode.lat, geocode.long) });
    }
  }

  document.addEventListener("DOMContentLoaded", createMap);
  window.addEventListener("message", getMessage);
})();
