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

      // register the Scheduled Tile Update
      registerTileUpdate();

      if (app.sessionState.history) {
        nav.history = app.sessionState.history;
      }

      args.setPromise(WinJS.UI.processAll().then(function () {
        // if we got here from a secondary tile
        if (args.detail.tileId !== "App") {

          // insert the main page into the navigation to support back button
          if (nav.history.current.initialPlaceholder) {
            nav.history.current = { location: Application.navigator.home };
          }

          // navigate to the split page with the right group key
          var groupKey = args.detail.tileId;
          return nav.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
        else if (nav.location) {
          nav.history.current.initialPlaceholder = true;
          return nav.navigate(nav.location, nav.state);
        }
        else {
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

  app.start();

  function registerTileUpdate() {
    var notifications = Windows.UI.Notifications;

    // how often to check for a new tile?
    var period = notifications.PeriodicUpdateRecurrence.daily;

    //// where to find the tile?
    //var url = new Windows.Foundation.Uri("http://sellsbrothers.com/win8/tileupdate.xml");

    //// start the process
    //var updater = notifications.TileUpdateManager.createTileUpdaterForApplication();
    //updater.startPeriodicUpdate(url, period);

    // where to find the tile?
    var urls = [
      new Windows.Foundation.Uri("http://sellsbrothers.com/win8/tileupdate1.xml"),
      new Windows.Foundation.Uri("http://sellsbrothers.com/win8/tileupdate2.xml"),
      new Windows.Foundation.Uri("http://sellsbrothers.com/win8/tileupdate3.xml"),
      new Windows.Foundation.Uri("http://sellsbrothers.com/win8/tileupdate4.xml"),
      new Windows.Foundation.Uri("http://sellsbrothers.com/win8/tileupdate5.xml")
    ];

    // allow for notification queue when app is installed
    var updater = notifications.TileUpdateManager.createTileUpdaterForApplication();
    updater.enableNotificationQueue(true);

    // start the batch updates
    updater.startPeriodicUpdateBatch(urls, period);
  }
})();
