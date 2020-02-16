// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    
    var profile, mediaCapture, audioFile;
  
    function initializeCaptureSettings(deviceList) {
      var capture = Windows.Media.Capture
      var captureSettings = new capture.MediaCaptureInitializationSettings();
      captureSettings.audioDeviceId = deviceList[0].id || "";
      captureSettings.streamingCaptureMode = capture.StreamingCaptureMode.audio;
      captureSettings.realTimeModeEnabled = true;

      return captureSettings;
    }
  
    function initializeCapture(captureSettings) {
      mediaCapture = new Windows.Media.Capture.MediaCapture();

      mediaCapture.initializeAsync(captureSettings).done(function (result) {
        profile = Windows.Media.MediaProperties.MediaEncodingProfile.createMp3(Windows.Media.MediaProperties.AudioEncodingQuality.high);
      });
    }

    WinJS.UI.Pages.define("/pages/audioRecording/audioRecording.html", {
      ready: function (element, options) {
        var deviceEnum = Windows.Devices.Enumeration;
        var deviceInfo = deviceEnum.DeviceInformation;

        deviceInfo.findAllAsync(deviceEnum.DeviceClass.audioCapture).done(function (devices) {
          var deviceList = devices;
          var captureSettings;
          
          captureSettings = initializeCaptureSettings(deviceList);
         
          initializeCapture(captureSettings);

          document.querySelector('#record').addEventListener('click', function () {
            Windows.Storage.KnownFolders.musicLibrary.createFileAsync('audioCapture.mp3', Windows.Storage.CreationCollisionOption.replaceExisting).then(function (file) {
              audioFile = file;
              mediaCapture.startRecordToStorageFileAsync(profile, audioFile).done(function (result) {
                document.querySelector('#status').innerText = "Recording Started...";
              });
            });
          });

          document.querySelector('#stop').addEventListener('click', function () {
            mediaCapture.stopRecordAsync().done(function (result) {
              var file = window.URL.createObjectURL(audioFile);
              document.querySelector('#audioTarget').src = file;

              document.querySelector('#status').innerText = "Recording Finished...";
            }, function (error) {
              document.querySelector('#status').innerText = error.msg;
            });
          });
        });
      }
    });
})();
