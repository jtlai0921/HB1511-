(function () {
  var orientationSensor;
  var app = WinJS.Application;
  
  function onDataChanged(e) {
    switch (e.orientation) {
      case Windows.Devices.Sensors.SimpleOrientation.notRotated:
        document.getElementById('txtOrientation').innerHTML = "Not Rotated";
        break;
      case Windows.Devices.Sensors.SimpleOrientation.rotated90DegreesCounterclockwise:
        document.getElementById('txtOrientation').innerHTML = "Rotated 90";
        break;
      case Windows.Devices.Sensors.SimpleOrientation.rotated180DegreesCounterclockwise:
        document.getElementById('txtOrientation').innerHTML = "Rotated 180";
        break;
      case Windows.Devices.Sensors.SimpleOrientation.rotated270DegreesCounterclockwise:
        document.getElementById('txtOrientation').innerHTML = "Rotated 270";
        break;
      case Windows.Devices.Sensors.SimpleOrientation.faceup:
        document.getElementById('txtOrientation').innerHTML = "Face Up";
        break;
      case Windows.Devices.Sensors.SimpleOrientation.facedown:
        document.getElementById('txtOrientation').innerHTML = "Face Down";
        break;
      default:
        document.getElementById('txtOrientation').innerHTML = "Undefined orientation " + e.orientation;
        break;
    }
  }

  app.onactivated = function (eventObject) {
    if (eventObject.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {

      orientationSensor = Windows.Devices.Sensors.SimpleOrientationSensor.getDefault();

      if (orientationSensor) {
        orientationSensor.addEventListener("orientationchanged", onDataChanged);
      }

      WinJS.UI.processAll();
    }
  };

  app.start();

})();
