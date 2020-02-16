// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    
    var profile, mediaCapture, audioFile;

    function enumerateMicrophones() {
      var deviceInfo = Windows.Devices.Enumeration.DeviceInformation;

      return deviceInfo.findAllAsync(Windows.Devices.Enumeration.DeviceClass.audioCapture);
    }

    function initializeCaptureSettings(deviceList) {
      var captureSettings = new Windows.Media.Capture.MediaCaptureInitializationSettings();
      captureSettings.audioDeviceId = deviceList[1].id || "";
      captureSettings.streamingCaptureMode = Windows.Media.Capture.StreamingCaptureMode.audio;
      captureSettings.realTimeModeEnabled = true;

      return captureSettings;
    }

    function createProfile() {
      profile = Windows.Media.MediaProperties.MediaEncodingProfile.createMp3(Windows.Media.MediaProperties.AudioEncodingQuality.high);
    }

    function initializeCapture(captureSettings, profile) {
      mediaCapture = new Windows.Media.Capture.MediaCapture();

      mediaCapture.initializeAsync(captureSettings).done(function (result) {
        createProfile();
      });
    }

    WinJS.UI.Pages.define("/pages/audioRecording/audioRecording.html", {
      ready: function (element, options) {
        enumerateMicrophones().done(function (devices) {
          var deviceList = [];
          var captureSettings;

          for (var i = 0, len = devices.length; i < len; i++) {
            deviceList.push(devices[i]);
          }

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
