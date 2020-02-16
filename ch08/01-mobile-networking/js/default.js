// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
  "use strict";

  WinJS.Binding.optimizeBindingReferences = true;

  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;
  var nav = WinJS.Navigation;

  app.addEventListener("activated", function (args) {
    if (args.detail.kind === activation.ActivationKind.launch) {
      if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
        // TODO: This application has been newly launched. Initialize
        // your application here.
      } else {
        // TODO: This application has been reactivated from suspension.
        // Restore application state here.
      }
    }

    var downloading = false;
    var netinfo = Windows.Networking.Connectivity.NetworkInformation;
    if (netinfo.getInternetConnectionProfile() != null) { /* connected */
      downloadFeeds();
    }

    //netinfo.onnetworkstatuschanged = function () {
    //  if (netinfo.getInternetConnectionProfile() != null) { downloadFeeds(); }
    //  else { cancelFeedDownload(); }
    //};

    function downloadFeeds() { if (downloading) { return; } downloading = true; }
    function downloadFavoriteFeeds() { if (downloading) { return; } downloading = true; }
    function cancelFeedDownload() { if (!downloading) { return; } downloading = false; }

    function getEnumName(enumeration, value) {
      for (var name in enumeration) {
        if (enumeration[name] == value) { return name; }
      }
      return undefined;
    }

    // output some network connection facts
    var netcost = Windows.Networking.Connectivity.NetworkCostType;
    var cost = netinfo.getInternetConnectionProfile().getConnectionCost();
    var networkCostTypeName = getEnumName(netcost, cost.networkCostType);

    output.innerHTML += "<p>networkCostType= " + networkCostTypeName + "</p>";
    output.innerHTML += "<p>roaming= " + cost.roaming + "</p>";
    output.innerHTML += "<p>overDataLimit= " + cost.overDataLimit + "</p>";
    output.innerHTML += "<p>approachingDataLimit= " + cost.approachingDataLimit + "</p>";
    output.innerHTML += "<p>costType= " + getCostType(cost) + "</p>";
  });

  var netinfo = Windows.Networking.Connectivity.NetworkInformation;
  var netcost = Windows.Networking.Connectivity.NetworkCostType;

  // check connection costs to make app decisions
  function getCostType(cost) {
    if (cost.roaming) { return "high"; }

    switch (cost.networkCostType) {
      case netcost.variable:
        return "low";

      case netcost.fixed:
        if (cost.approachingDataLimit || cost.overDataLimit) { return "high"; }
        else { return "low"; }

      case netcost.unrestricted:
      case netcost.unknown:
        return "free";
    }
  }

  function checkConnection() {
    var profile = netinfo.getInternetConnectionProfile();
    if (profile != null) {
      // if we're connected, check costs
      switch (getCostType(profile.getConnectionCost())) {
        case "high": cancelFeedDownload(); break;
        case "low": downloadFavoriteFeeds(); break;
        case "free": downloadFeeds(); break;
      }
    }
    else {
      // if we're no longer connected, stop downloading
      cancelFeedDownload();
    }
  }

  netinfo.onnetworkstatuschanged = checkConnection;

  app.oncheckpoint = function (args) {
    // TODO: This application is about to be suspended. Save any state
    // that needs to persist across suspensions here. If you need to 
    // complete an asynchronous operation before your application is 
    // suspended, call args.setPromise().
    app.sessionState.history = nav.history;
  };

  app.start();
})();
