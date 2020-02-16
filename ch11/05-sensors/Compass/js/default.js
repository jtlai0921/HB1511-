// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var compass;
    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    
    function rotateCompass(heading) {
      var compass = document.querySelector('embed');

      compass.setAttribute('style', "transform: rotate(-" + Math.floor(heading) + "deg);");
    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
          var compassDataLabel = document.getElementById('compassData');
          var reading;

          compass = Windows.Devices.Sensors.Compass.getDefault();

          if (compass) {
            compass.reportInterval = 50;
            compass.addEventListener("readingchanged", function (event) {
              reading = event.reading;
              var heading = reading.headingMagneticNorth !== null ? reading.headingMagneticNorth.toFixed(2) : reading.headingTrueNorth.toFixed(2);
              compassDataLabel.innerText = heading;

              rotateCompass(heading);
            });

            reading = compass.getCurrentReading();
            compassDataLabel.innerText = reading.headingMagneticNorth || reading.headingTrueNorth;
          }

          args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
