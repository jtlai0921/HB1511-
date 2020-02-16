// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var _imgStream;
    var Imaging = Windows.Graphics.Imaging;

    function pickImage() {
        var objectUrl;

        //initialize picker here
        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.fileTypeFilter.append([".jpg"]);
        picker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;

        picker.pickSingleFileAsync().done(function (file) {
            var img = document.querySelector('img#original');

            if (!file) {
                return;
            } else {
                _imgStream = file;

                objectUrl = window.URL.createObjectURL(file);
                img.src = objectUrl;
            }
        });
    }

    function invertImage() {
        var Imaging = Windows.Graphics.Imaging;
        var accessMode = Windows.Storage.FileAccessMode.readWrite;
        var fileStream, newFile, decoder, encoder;

        //Have to add the "Pictures Library Capability"
        _imgStream.copyAsync(Windows.Storage.KnownFolders.picturesLibrary, "invertedImage.jpg", Windows.Storage.NameCollisionOption.generateUniqueName).then(function (file) {
            newFile = file;
            return newFile.openAsync(accessMode);
        }).then(function (stream) {
            fileStream = stream;
            return Imaging.BitmapDecoder.createAsync(fileStream);
        }).then(function (fileDecoder) {
            decoder = fileDecoder;
            return Imaging.BitmapEncoder.createForTranscodingAsync(fileStream, decoder);
        }).then(function (fileEncoder) {
            encoder = fileEncoder;
            return decoder.getPixelDataAsync(
                Imaging.BitmapPixelFormat.rgba16, // Force RGBA
                Imaging.BitmapAlphaMode.straight, // Force straight alpha
                new Imaging.BitmapTransform(),    // No transforms
                true,                             // Respect EXIF orientation
                true                              // Color convert to sRGB
                );
        }).then(function (pixelDataProvider) {
				var pixels = pixelDataProvider.detachPixelData();
				var width = decoder.pixelWidth;
				var height = decoder.pixelHeight;
				var length, i;
				var rgbBase = 255;

				for (i = 0, length = pixels.length; i < length; i += 4) {
					pixels[i] = rgbBase - pixels[i];
					pixels[i + 1] = rgbBase - pixels[i + 1];
					pixels[i + 2] = rgbBase - pixels[i + 2];
				}

				encoder.setPixelData(Imaging.BitmapPixelFormat.rgba16, Imaging.BitmapAlphaMode.straight, width, height, decoder.dpiX, decoder.dpiY, pixels);
				//Flip the image
				//encoder.bitmapTransform.flip = Imaging.BitmapFlip.horizontal;
				encoder.isThumbnailGenerated = true;

				pixels = null; // Deallocate the byte array
				return encoder.flushAsync();
        }).done(function () {
            fileStream && fileStream.close();

            var newImage = document.querySelector('#modImage');
            var objectUrl = window.URL.createObjectURL(newFile);

            newImage.src = objectUrl;

            newImage.style.display = "inline";
            WinJS.UI.Animation.fadeIn(newImage);
        });
    }

    function ready(element, options) {
        var getImage, invert, originalImg;

        getImage = document.querySelector('#getImage');
        invert = document.querySelector('#invert');

        getImage.addEventListener('click', pickImage);
        invert.addEventListener('click', invertImage);

        originalImg = document.querySelector('img#original');
        originalImg.addEventListener('load', function () {
            invert.disabled = false;

            originalImg.style.display = "inline";
            WinJS.UI.Animation.fadeIn(originalImg);
        });
    }

    WinJS.UI.Pages.define("/pages/WinRTImage/WinRTImage.html", {
        ready:ready
    });
})();
