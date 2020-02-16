(function () {
    "use strict";

    var accelerometer;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    WinJS.strictProcessing();
  
    function displayAccelData(reading) {
      var accelData = document.getElementById('accelData');

      accelData.innerText = "X: " + reading.accelerationX.toFixed(4) + " | Y: " + reading.accelerationY.toFixed(4) + " | Z: " + reading.accelerationZ.toFixed(4);
    }

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
          if (!accelerometer) {
            accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();

            if (accelerometer) {
              accelerometer.reportInterval = 50;
              accelerometer.addEventListener('readingchanged', function (event) {
                displayAccelData(event.reading);
              });

              displayAccelData(accelerometer.getCurrentReading());
            }
          }

          if (app.sessionState.history) {
              nav.history = app.sessionState.history;
          }
          args.setPromise(WinJS.UI.processAll().then(function () {
              if (nav.location) {
                  nav.history.current.initialPlaceholder = true;
                  return nav.navigate(nav.location, nav.state);
              } else {
                  return nav.navigate(Application.navigator.home);
              }
          }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
