(function () {
  "use strict";

  WinJS.UI.Pages.define("/pages/home/home.html", {
    ready: function (element, options) {

      openTextFileButton.onclick = function () {
        // get a file name from the use and read its contents
        var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        openPicker.fileTypeFilter.replaceAll([".txt", ".bat"]);

        openPicker.pickSingleFileAsync().then(function (file) {
          if (file) {
            // read from the picked file
            openStatus.innerText = "Opened: " + file.name + " (path= '" + file.path + "')";
            Windows.Storage.FileIO.readTextAsync(file).done(function (text) {
              openFileTextArea.value = text;
            });
          }
          else {
            // user canceled operation
            openStatus.innerText = "Open canceled";
            openFileTextArea.value = "";
          }
        });
      };

      saveTextFileButton.onclick = function () {
        // get a file name from the user and write its contents
        var savePicker = new Windows.Storage.Pickers.FileSavePicker();
        savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        savePicker.fileTypeChoices.insert("Text File", [".txt"]);
        savePicker.fileTypeChoices.insert("Batch File", [".bat"]);
        savePicker.suggestedFileName = "New Document";

        savePicker.pickSaveFileAsync().then(function (file) {
          if (file) {
            // write to the picked file
            Windows.Storage.FileIO.writeTextAsync(file, saveFileTextArea.value).done(function () {
              // file contents have been written
              saveStatus.innerText = "Saved: " + file.name + " (path= '" + file.path + "')";
              saveFileTextArea.value = "";
            });
          }
          else {
            // user canceled operation
            saveStatus.innerText = "Save canceled";
          }
        });
      };

      pickFolderButton.onclick = function () {
        // get a folder name from the user
        var folderPicker = new Windows.Storage.Pickers.FolderPicker;
        folderPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        folderPicker.fileTypeFilter.replaceAll(["*"]);

        folderPicker.pickSingleFolderAsync().then(function (folder) {
          if (folder) {
            // use read/write access to this folder now or cache the permissions for later use:
            // Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList.addOrReplace("PickedFolderToken", folder);
            pickStatus.innerText = "Picked: " + folder.name + " (path= '" + folder.path + "')";
          }
          else {
            // user canceled operation
            pickStatus.innerText = "Pick canceled";
          }
        });
      };

    },
  });
})();
