(function () {
    "use strict";

    Debug.enableFirstChanceException = true;
    var app = WinJS.Application;

    var takePicture = function () {
        var captureUI = new Windows.Media.Capture.CameraCaptureUI();
        var message = document.querySelector('#message');
        var img = document.querySelector('#capturedPhoto');

        captureUI.photoSettings.format = Windows.Media.Capture.CameraCaptureUIPhotoFormat.png;
        captureUI.photoSettings.croppedAspectRatio = { width: 4, height: 3 };
        captureUI.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedItem) {
            if (capturedItem) {
                img.src = URL.createObjectURL(capturedItem);
                
                message.innerHTML = "User Captured a Photo";
            } else {
                message.innerHTML = "User didn't capture a Photo";
            }
        });
    }

    app.onactivated = function (eventObject) {
        if (eventObject.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {
            var button = document.querySelector('[type=button]');
            button.onclick = takePicture;

            WinJS.UI.processAll();
        }
    };

    app.start();
})();
