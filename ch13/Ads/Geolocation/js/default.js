// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";
  
    var locator, map;
    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    WinJS.strictProcessing();


    function addToMap(lat, long) {
      map.setView({
        center: new Microsoft.Maps.Location(lat, long),
        mapTypeId: Microsoft.Maps.MapTypeId.auto, zoom: 18
      });

      var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
      map.entities.push(pushpin);
    }

    function getGeoPosition() {
      locator = new Windows.Devices.Geolocation.Geolocator();
      return locator.getGeopositionAsync();
    }

    function getPositionHandler(location) {
      document.getElementById("latitude").innerHTML = location.coordinate.latitude;
      document.getElementById("longitude").innerHTML = location.coordinate.longitude;
      document.getElementById("accuracy").innerHTML = location.coordinate.accuracy;
      
      addToMap(location.coordinate.latitude, location.coordinate.longitude);
    }

    function errorHandler(err) {
      //document.getElementById("status").innerHTML = getStatusString(locator.locationStatus);
    }

    function getStatusString(locStatus) {
      switch (locStatus) {
        case Windows.Devices.Geolocation.PositionStatus.ready:
          return "Location found.";
          break;
        case Windows.Devices.Geolocation.PositionStatus.initializing:
          return "A GPS device is still initializing.";
          break;
        case Windows.Devices.Geolocation.PositionStatus.noData:
          return "Data from location services is currently unavailable.";
          break;
        case Windows.Devices.Geolocation.PositionStatus.disabled:
          return "Your location is currently turned off. " +
              "Change your settings through the Settings charm " +
              " to turn it back on.";
          break;
        case Windows.Devices.Geolocation.PositionStatus.notInitialized:
          return "Location status is not initialized because " +
              "the app has not requested location data.";
          break;
        case Windows.Devices.Geolocation.PositionStatus.notAvailable:
          return "You do not have the required location services " +
              "present on your system.";
          break;
        default:
          break;
      }
    }

   function initMap() {
      try {
        var mapOptions =
        {
          credentials: "Aobl4homd3pxwBrWnQNuX25Vna6u25EHc-LJcvzIGPldJLQZdsGq6mk57Aq0ft80",
          center: new Microsoft.Maps.Location(40.71, -74.00),
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: 8
        };
        map = new Microsoft.Maps.Map(document.getElementById("map"), mapOptions);
      }
      catch (e) {
        var md = new Windows.UI.Popups.MessageDialog(e.message);
        md.showAsync();
      }
    }


    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
          args.setPromise(WinJS.UI.processAll().done(function() {
            document.querySelector('#WinLoc').addEventListener('click', function () {
              getGeoPosition().done(getPositionHandler, errorHandler);
            });

          Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap });
        }));
      }

        getGeoPosition().done(function (position) {
          getPositionHandler(position);

          //Set Ad data
          var adControl = document.querySelector('#imageAd').winControl;
          adControl.isAutoCollapseEnabled = true;
          adControl.isAutoRefreshEnabled = false;
          adControl.keywords = "win8, metro, geolocation";

          adControl.countryOrRegion = "US";
          adControl.latitude = position.coordinate.latitude;
          adControl.longitude = position.coordinate.longitude;
          adControl.refresh();

      }, errorHandler);
    };

    app.start();
})();
