(function () {
    "use strict";

    var app = WinJS.Application;
    window.imageList = new WinJS.Binding.List([]);

    function pickImages() {
        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        picker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg", ".tiff", ".gif"]);

        return picker.pickMultipleFilesAsync().then(function (files) {
            var i, objUrl;

            if (files) {
                for (i = 0; i < files.length; i++) {
                    objUrl = window.URL.createObjectURL(files[i]);
                    imageList.push({ url: objUrl, name: files[i].displayName });
                }
            }
        });
    }

    app.onactivated = function (eventObject) {
        var pick = document.querySelector('#pickImages');

        pick.addEventListener('click', pickImages);
        pickImages();

        WinJS.UI.processAll();
    };

    app.start();
})();
