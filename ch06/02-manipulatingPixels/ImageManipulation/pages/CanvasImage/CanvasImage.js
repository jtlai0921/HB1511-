// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    function pickImage() {
        var objectUrl;
        var img = document.querySelector('img#original');

        //initialize picker here
        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.fileTypeFilter.append([".jpg"]);
        picker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;

        picker.pickSingleFileAsync().done(function (file) {
            if (!file) {
                return;
            } else {
                objectUrl = window.URL.createObjectURL(file);
                img.src = objectUrl;
            }
        });
    }

    function invertImage() {
        var canvas, ctx, imageData, data, i, length;
        var img = document.querySelector('img#original');

        if (img.src !== '#') {
            canvas = document.querySelector('canvas');
            ctx = canvas.getContext('2d');

            //invert those pixels!
            ctx.drawImage(img, 0, 0, 375, 375);

            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            data = imageData.data;

            for (i = 0, length = data.length; i < length; i += 4) {
                data[i] = 255 - data[i]; // red
                data[i + 1] = 255 - data[i + 1]; // green
                data[i + 2] = 255 - data[i + 2]; // blue
                // i+3 is alpha (the fourth element)
            }

            // overwrite original image
            ctx.putImageData(imageData, 0, 0);

            //Fade in the canvas element
            WinJS.UI.Animation.fadeIn(canvas);
        }
    }

    function ready(element, options) {
        var getImage, invert, originalImg;
        var main, source, target;

        getImage = document.querySelector('#getImage');
        invert = document.querySelector('#invert');

        getImage.addEventListener('click', pickImage);
        invert.addEventListener('click', invertImage);

        originalImg = document.querySelector('img#original');
        originalImg.addEventListener('load', function () {
            invert.disabled = false;

            //shorthand for originalImg.setAttribute('style', '-ms-transition: opacity 167ms linear 0ms; opacity: 1');
            WinJS.UI.Animation.fadeIn(originalImg);
        });

        main = document.querySelector('.fragment');
        source = document.querySelector('#source');
        target = document.querySelector('#target');
        WinJS.UI.Animation.enterPage([[main], [source, target]], null);
    }

    WinJS.UI.Pages.define("/pages/CanvasImage/CanvasImage.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: ready
    });
})();
