(function () {
    "use strict";
    
    var autoplayDeviceId, autoPlayDrive;

    var webApp = Windows.UI.WebUI.WebUIApplication;
    var activation = Windows.ApplicationModel.Activation;
    WinJS.strictProcessing();

    function displayImage(items) {
      for (var i = 0, l = items.length; i < l; i++) {
        if (items[i].size > 0) { 
          var img = document.getElementById("img");

          document.getElementById("status").innerHTML = "Image file name: " + imageFile.name + "<br/>";
          img.src = window.URL.createObjectURL(items[i], false);
          WinJS.UI.Animation.fadeIn(img);

          break;
        }
      }
    }

    function getImagefromAutoplay() {
      document.getElementById("output").innerHTML = "";

      if (autoPlayDrive) {
        document.getElementById("status").innerHTML = "Activated using Drive Autoplay";

        var options = new Windows.Storage.Search.QueryOptions(Windows.Storage.Search.CommonFileQuery.orderByDate,
           [".jpg", ".png", ".gif"]);
        var imgQuery = autoPlayDrive.createFileQueryWithOptions(options);

        imgQuery.getFilesAsync().done(function (items) {
          displayImage(items);
        }, function (e) {
          document.getElementById("output").innerHTML = "Error while looking for images in '" + autoPlayDrive.name + "': " + e.message;
        });
        
      } else if (autoplayDeviceId) {
        document.getElementById("output").innerHTML = "Activated using Device Autoplay";

        var autoPlayDevice = Windows.Devices.Portable.StorageDevice.fromId(autoplayDeviceId);

        var options = new Windows.Storage.Search.QueryOptions(Windows.Storage.Search.CommonFileQuery.orderByDate,
         [".jpg", ".png", ".gif"]);
        var imgQuery = autoPlayDevice.createFileQueryWithOptions(options);
        
        imgQuery.getFilesAsync().done(function (items) {
          displayImage(items);
        }, function (e) {
          document.getElementById("output").innerHTML = "Error while looking for images in '" + autoPlayDevice.name + "': " + e.message;
        });
      } else {
        document.getElementById("output").innerHTML = "Not activated via AutoPlay.";
      }
    }

    webApp.onactivated = function (args) {
      if (args.kind === activation.ActivationKind.file) {
        autoplayDeviceId = null;
        autoPlayDrive = args.files[0];

        getImagefromAutoplay();
      } else if (args.kind === activation.ActivationKind.device) {
        autoplayDeviceId = args.deviceInformationId;
        autoPlayDrive = null;

        getImagefromAutoplay();
      } else {
        document.getElementById("output").innerHTML = "Not activated via AutoPlay.";
        document.getElementById('getPhoto').disabled = true;
      }
    }

    function init() {
      document.getElementById('getPhoto').addEventListener('click', getImagefromAutoplay);
    }

    document.addEventListener("DOMContentLoaded", init, false);
})();
