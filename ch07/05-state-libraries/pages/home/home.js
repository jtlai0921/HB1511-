(function () {
  "use strict";

  var libraries = new WinJS.Binding.List();
  window.groupedLibraries = libraries.createGrouped(
    function (item) { return item.group.key; },
    function (item) { return item.group; }
  );

  var dir = Windows.Storage.FileAttributes.directory;
  var knownFolders = Windows.Storage.KnownFolders;
  var groups = [
    { key: "lib1", name: "Documents", library: knownFolders.documentsLibrary },
    { key: "lib2", name: "Music", library: knownFolders.musicLibrary },
    { key: "lib3", name: "Pictures", library: knownFolders.picturesLibrary },
    { key: "lib4", name: "Videos", library: knownFolders.videosLibrary },
  ];

  groups.forEach(function (group) {
    group.library.getItemsAsync().done(function (items) {
      items.filter(function (item) { return (item.attributes & dir) == 0; }).forEach(function (item) {
        libraries.push({ group: group, name: item.name });
      });
    });
  });

  //var documentGroup = { key: "lib1", name: "Documents" };
  //Windows.Storage.KnownFolders.documentsLibrary.getItemsAsync().done(function (items) {
  //  items.forEach(function (item) {
  //    if ((item.attributes & Windows.Storage.FileAttributes.directory) == 0) {
  //      libraries.push({ group: documentGroup, name: item.name });
  //    }
  //  });
  //});

  WinJS.UI.Pages.define("/pages/home/home.html", {
    ready: function (element, options) {
    }
  });

})();
