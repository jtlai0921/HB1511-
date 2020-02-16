// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";
  
    var locator, map;
    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    WinJS.strictProcessing();

    function requestNavigatorPosition() {
      window.navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

      //var watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
    }

    //document.getElementById('clear').addEventListener('click', function () {
    //  navigator.geolocation.clearWatch(watchId);
    //});

    function successCallback(position) {
      document.getElementById("latitude").innerHTML = position.coords.latitude;
      document.getElementById("longitude").innerHTML = position.coords.longitude;
      document.getElementById("accuracy").innerHTML = position.coords.accuracy;

      addToMap(position.coords.latitude, position.coords.longitude);
    }

    function addToMap(lat, long) {
      map.setView({
        center: new Microsoft.Maps.Location(lat, long),
        mapTypeId: Microsoft.Maps.MapTypeId.auto, zoom: 18
      });

      var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
      map.entities.push(pushpin);
      //map.entities.push(new Microsoft.Maps.Infobox(map.getCenter(), { title: 'Here', description: 'You are here!', pushpin: pushpin }));
    }

    function errorCallback(error) {
      var strMessage = "";
      
      // Check for known errors
      switch (error.code) {
        case error.PERMISSION_DENIED:
          strMessage = "Access to your location is turned off. " +
              "Change your settings to turn it back on.";
          break;
        case error.POSITION_UNAVAILABLE:
          strMessage = "Data from location services is " +
              "currently unavailable.";
          break;
        case error.TIMEOUT:
          strMessage = "Location could not be determined " +
              "within a specified timeout period.";
          break;
        default:
          break;
      }

      document.getElementById("status").innerHTML = strMessage;
    }
    
    function requestWinPosition() {
      locator = new Windows.Devices.Geolocation.Geolocator();
      locator.getGeopositionAsync().done(getPositionHandler, errorHandler);

      //locator.addEventListener('positionchanged', getPositionHandler);
    }

    function getPositionHandler(location) {
      document.getElementById("latitude").innerHTML = location.coordinate.latitude;
      document.getElementById("longitude").innerHTML = location.coordinate.longitude;
      document.getElementById("accuracy").innerHTML = location.coordinate.accuracy;
      document.getElementById("status").innerHTML = getStatusString(locator.locationStatus);
      
      addToMap(location.coordinate.latitude, location.coordinate.longitude);
    }

    function errorHandler(err) {
      document.getElementById("status").innerHTML = getStatusString(locator.locationStatus);
    }

    function getStatusString(locStatus) {
      switch (locStatus) {
        case Windows.Devices.Geolocation.PositionStatus.ready:
          return "Location is available.";
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
            document.querySelector('#HTML5Loc').addEventListener('click', requestNavigatorPosition);
            document.querySelector('#WinLoc').addEventListener('click', requestWinPosition);

            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap });

          }));
        }
    };

    app.start();
})();
