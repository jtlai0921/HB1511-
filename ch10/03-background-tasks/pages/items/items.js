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
      
      // Specify the name of the task
      // (used to make sure we only have one task registered)
      var taskName = "RSS Reader Timer Task";

      // Get a list of background tasks
      var tasks = background.BackgroundTaskRegistration.allTasks;

      // Look for task
      var found = false;
      var iter = tasks.first();
      var hasValue = iter.hasCurrent;
      while (hasValue) {
        var task = iter.current.value;
        if (task.name == taskName) {
          found = true;
          break;
        }
        // Check next one
        hasValue = iter.moveNext();
      };

      // Only add it if we can't find it
      if (!found) {
        // Create the task
        var taskBuilder = new background.BackgroundTaskBuilder();
        taskBuilder.name = taskName;
        taskBuilder.taskEntryPoint = "js\\backgroundtask.js";

        // Set trigger
        // 15 minutes but could be 15 minutes later, repeating
        var trigger = new background.TimeTrigger(15, false); // 15 is minimum
        //var triggerType = background.SystemTriggerType.timeZoneChange;
        //var trigger = new background.SystemTrigger(triggerType, false);
        taskBuilder.setTrigger(trigger);

        // Set requirements (Internet must exist)
        //var type = background.SystemConditionType.internetAvailable;
        //var condition = new background.SystemCondition(type);
        //taskBuilder.addCondition(condition);

        // Register the task
        var result = taskBuilder.register();
        if (result) {
          var dlg = new Windows.UI.Popups.MessageDialog("Added");
          dlg.showAsync();
        }
      } else {
        var dlg = new Windows.UI.Popups.MessageDialog("Already Registered...");
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
