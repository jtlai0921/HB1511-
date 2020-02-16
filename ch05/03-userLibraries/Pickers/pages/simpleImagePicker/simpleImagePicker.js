(function () {
    "use strict";

    function copyNew() {
        var fileSavePicker = new Windows.Storage.Pickers.FileSavePicker();
        fileSavePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        fileSavePicker.fileTypeChoices.insert("JPEG Image", [".jpeg", ".jpg"]);
        fileSavePicker.defaultFileExtension = ".jpg";
        fileSavePicker.suggestedFileName = "MyCopy";

        fileSavePicker.pickSaveFileAsync().then(function (file) {
            if (file) {
                //local function (omitted) to copy the contents of an existing file into this new file and save
                //copyFile(oldfile, file);
            }
        });
    }

    function pickImage() {
        var targetImage = document.querySelector('img#targetMedia');
    	
        targetImage.addEventListener('load', function () {
            WinJS.UI.Animation.fadeIn(this);
        });

        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        picker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg", ".tiff", ".gif"]);

        picker.pickSingleFileAsync().then(function (file) {
            if (file) {
                var objUrl = window.URL.createObjectURL(file);
                targetImage.src = objUrl;
            }
        });
    }
    
    function ready(element, options) {
        var pick = document.querySelector('#pickImage');
    	
        pick.addEventListener('click', pickImage);

        var copy = document.querySelector('#copy');
        copy.addEventListener('click', copyNew);
    }

    WinJS.UI.Pages.define("/pages/simpleImagePicker/simpleImagePicker.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: ready
    });
})();
