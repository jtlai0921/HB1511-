// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    function pickVideo() {
        var targetVideo = document.querySelector('video#target');

        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.videosLibrary;
        picker.fileTypeFilter.replaceAll([".mp4", ".mpeg", ".wmv"]);

        picker.pickSingleFileAsync().then(function (file) {
            if (file) {
                var objUrl = window.URL.createObjectURL(file);
                targetVideo.src = objUrl;
            }
        });
    }

    function ready(element, options) {
        var pick = document.querySelector('#pickVideo');

        pick.addEventListener('click', pickVideo);
    }

    WinJS.UI.Pages.define("/pages/simpleVideoPicker/simpleVideoPicker.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: ready
    });
})();
