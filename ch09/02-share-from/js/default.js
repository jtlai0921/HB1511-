// default.js
// For an introduction to the Split template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232447
(function () {
  "use strict";

  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;
  var nav = WinJS.Navigation;
  WinJS.strictProcessing();

  app.addEventListener("activated", function (args) {
    if (args.detail.kind === activation.ActivationKind.launch) {
      if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
        // TODO: This application has been newly launched. Initialize
        // your application here.
      } else {
        // TODO: This application has been reactivated from suspension.
        // Restore application state here.
      }

      if (app.sessionState.history) {
        nav.history = app.sessionState.history;
      }
      args.setPromise(WinJS.UI.processAll().then(function () {
        if (nav.location) {
          nav.history.current.initialPlaceholder = true;
          return nav.navigate(nav.location, nav.state);
        } else {
          return nav.navigate(Application.navigator.home);
        }
      }));
    }
  });

  app.oncheckpoint = function (args) {
    // TODO: This application is about to be suspended. Save any state
    // that needs to persist across suspensions here. If you need to 
    // complete an asynchronous operation before your application is 
    // suspended, call args.setPromise().
    app.sessionState.history = nav.history;
  };

  app.onsettings = function (e) {
    e.detail.applicationcommands = {
      feedsFlyout: { title: "Feeds", href: "/settings/feeds/feeds.html" },
      aboutFlyout: { title: "About", href: "/settings/about/about.html" },
    };

    WinJS.UI.SettingsFlyout.populateSettings(e);
  };


  /* Share Data */
  var dataManager = Windows.ApplicationModel.DataTransfer.DataTransferManager;

  var dataTransfer = dataManager.getForCurrentView();
  dataTransfer.addEventListener("datarequested", function (args) {

    var request = args.request;

    var splitPageUri = "/pages/split/split.html";
    // See if the current page is Split page
    if (nav.location == splitPageUri) {

      var page = WinJS.UI.Pages.get("/pages/split/split.html");

      var currentPage = WinJS.Navigation.history.current;

      // only transfer if current item is picked
      if (currentPage.state.selectedItem) { 

        // Set the data that you want to share
        var item = currentPage.state.selectedItem.data;
        request.data.properties.title = item.title;
        request.data.properties.description = item.description;
        request.data.setText(item.title);
        request.data.setUri(item.originalUri);
        request.data.setHtmlFormat(item.content);
        request.data.setBitmap(Data.appIconStreamReference);

      } else {
        request.failWithDisplayText("You must be viewing a story to share it.");
      }
    } else { 
      request.failWithDisplayText("You must be viewing a story to share it.");
    }
  });

  app.start();
})();
