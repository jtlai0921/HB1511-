(function () {
    "use strict";

    var lightSensor;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    WinJS.strictProcessing();

    function adjustStylesheet(lux) {
      var body = document.querySelector('body');

      if (lux > 1000 || lux < 40) {
        WinJS.Utilities.addClass(body, 'light');
      } else {
        WinJS.Utilities.removeClass(body, 'light');
      }
    }

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
          if (!lightSensor) {
            lightSensor = Windows.Devices.Sensors.LightSensor.getDefault();
            lightSensor.reportInterval = lightSensor.minimumReportInterval || 30;

            lightSensor.addEventListener('readingchanged', function (event) {
              var lux = event.reading.illuminanceInLux.toFixed(2);
              document.getElementById('light').innerText = lux;
              adjustStylesheet(lux);
            });

            var lux = lightSensor.getCurrentReading().illuminanceInLux.toFixed(2);
            document.getElementById('light').innerText = lux;
            adjustStylesheet(lux);            
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
