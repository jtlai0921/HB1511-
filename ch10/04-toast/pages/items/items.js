(function () {
  "use strict";

  var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
  var ui = WinJS.UI;

  ui.Pages.define("/pages/items/items.html", {

    // This function updates the ListView with new layouts
    initializeLayout: function (listView, viewState) {
      /// <param name="listView" value="WinJS.UI.ListView.prototype" />

      if (viewState === appViewState.snapped) {
        listView.layout = new ui.ListLayout();
      } else {
        listView.layout = new ui.GridLayout();
      }
    },

    itemInvoked: function (args) {
      var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
      WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
    },

    // This function is called whenever a user navigates to this page. It
    // populates the page elements with the app's data.
    ready: function (element, options) {
      var listView = element.querySelector(".itemslist").winControl;
      listView.itemDataSource = Data.groups.dataSource;
      listView.itemTemplate = element.querySelector(".itemtemplate");
      listView.oniteminvoked = this.itemInvoked.bind(this);

      this.initializeLayout(listView, Windows.UI.ViewManagement.ApplicationView.value);
      listView.element.focus();

      // Wire button to turn on background task
      var button = element.querySelector("#enableTimerButton");
      button.addEventListener("click", function (e) {
        this.enableTimerTask();
      }.bind(this));
    },

    enableTimerTask: function () {
      var background = Windows.ApplicationModel.Background;

      // Create the task
      var taskBuilder = new background.BackgroundTaskBuilder();
      taskBuilder.name = "RSS Reader Timer Task";
      taskBuilder.taskEntryPoint = "js\\backgroundtask.js";

      // Set trigger
      var triggerType = background.SystemTriggerType.timeZoneChange;
      var trigger = new background.SystemTrigger(triggerType, false);
      taskBuilder.setTrigger(trigger);

      // Register the task
      var result = taskBuilder.register();
      if (result) {
        var dlg = new Windows.UI.Popups.MessageDialog("Added");
        dlg.showAsync();
      }

    },

    // This function updates the page layout in response to viewState changes.
    updateLayout: function (element, viewState, lastViewState) {
      /// <param name="element" domElement="true" />
      /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
      /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

      var listView = element.querySelector(".itemslist").winControl;
      if (lastViewState !== viewState) {
        if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
          var handler = function (e) {
            listView.removeEventListener("contentanimating", handler, false);
            e.preventDefault();
          }
          listView.addEventListener("contentanimating", handler, false);
          var firstVisible = listView.indexOfFirstVisible;
          this.initializeLayout(listView, viewState);
          listView.indexOfFirstVisible = firstVisible;
        }
      }
    }
  });
})();
