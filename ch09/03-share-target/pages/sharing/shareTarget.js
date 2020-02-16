// shareTarget.js
(function () {
  "use strict";

  var app = WinJS.Application;
  var share;

  function onShareSubmit() {
    document.querySelector(".progressindicators").style.visibility = "visible";
    document.querySelector(".commentbox").disabled = true;
    document.querySelector(".submitbutton").disabled = true;

    // TODO: Do something with the shared data stored in the 'share' var.

    share.reportCompleted();
  }

  // This function responds to all application activations.
  app.onactivated = function (args) {
    var thumbnail;

    if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
      document.querySelector(".submitbutton").onclick = onShareSubmit;
      share = args.detail.shareOperation;

      document.querySelector(".shared-title").textContent = share.data.properties.title;
      document.querySelector(".shared-description").textContent = share.data.properties.description;

      thumbnail = share.data.properties.thumbnail;
      if (thumbnail) {
        // If the share data includes a thumbnail, display it.
        args.setPromise(thumbnail.openReadAsync().done(function displayThumbnail(stream) {
          document.querySelector(".shared-thumbnail").src = window.URL.createObjectURL(stream);
        }));
      }
      else {
        // If no thumbnail is present, expand the description  and
        // title elements to fill the unused space.
        document.querySelector("section[role=main] header").style.setProperty("-ms-grid-columns", "0px 0px 1fr");
        document.querySelector(".shared-thumbnail").style.visibility = "hidden";
      }

      // show shared data
      var data = share.data;
      var found = false;

      var dataFormats = Windows.ApplicationModel.DataTransfer.StandardDataFormats;
      if (data.contains(dataFormats.text)) {
        found = true;
        data.getTextAsync().done(function (text) {
          document.querySelector(".shared-text").innerText = "Shared Text: " + text;
        });
      }

      if (data.contains(dataFormats.html)) {
        found = true;
        data.getHtmlFormatAsync().done(function (html) {
          // get fragment out of HTMLFormat object
          var fragment = Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.getStaticFragment(html);
          document.querySelector(".shared-html").innerText = "Shared HTML: " + fragment;
        });
      }

      if (data.contains(dataFormats.rtf)) {
        found = true;
        data.getRtfAsync().done(function (rtf) {
          document.querySelector(".shared-rtf").innerText = "Shared RTF: " + rtf;
        });
      }

      if (data.contains(dataFormats.uri)) {
        found = true;
        data.getUriAsync().done(function (uri) {
          document.querySelector(".shared-uri").innerText = "Shared URI: " + uri.absoluteUri;
        });
      }

      if (data.contains(dataFormats.bitmap)) {
        found = true;
        // let the shell know this may take a while
        share.reportStarted();
        share.data.getBitmapAsync().
          then(function (streamRef) {
            // get the bitmap from the stream
            return streamRef.openReadAsync();
          }).
          done(function (stream) {
            // let the shell know we have the data
            share.reportDataRetrieved();

            var uri = URL.createObjectURL(stream);
            document.querySelector(".shared-text").innerText = "Shared Bitmap:";
            document.querySelector(".shared-bitmap").src = uri;
            document.querySelector(".shared-bitmap").style.visibility = "visible";
          });
      }

      if (data.contains(dataFormats.storageItems)) {
        found = true;
        // let the shell know this may take a while
        share.reportStarted();
        data.getStorageItemsAsync().
          then(function (items) {
            // load the bitmap from a file
            var streams = Windows.Storage.Streams;
            var image = items.getAt(0); // only getting the first image
            var streamRef = streams.RandomAccessStreamReference.createFromFile(image);
            return streamRef.openReadAsync();
          }).
          done(function (stream) {
            // let the shell know we have the data
            share.reportDataRetrieved();

            var uri = URL.createObjectURL(stream);
            document.querySelector(".shared-text").innerText = "Shared Storage Item Bitmap:";
            document.querySelector(".shared-storage-item-bitmap").src = uri;
            document.querySelector(".shared-storage-item-bitmap").style.visibility = "visible";
          });
      }

      if (!found) {
        share.reportError("No known data formats available");
      }

    }
  };

  app.start();
})();
