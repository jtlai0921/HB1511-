// backgroundtask.js
(function () {
  "use strict";

  // import other scripts
  importScripts("//Microsoft.WinJS.1.0/js/base.js", "/js/backgrounddata.js");

  var ui = Windows.UI.WebUI;

  // Get current instance of task
  var task = ui.WebUIBackgroundTaskInstance.current;

  // Support cancelling gracefully if possible
  var hasCancelled = false; 

  // Handle Cancellation
  task.addEventListener("cancelled", function (sender, reason) {
    hasCancelled = true;
  });

  // Update Badge #
  function updateBadge(number) {

    var notifications = Windows.UI.Notifications;

    // Pick a badge that shows the #/stories in the RSS Reader
    var type = notifications.BadgeTemplateType.badgeNumber;

    // Get the XML
    var xml = notifications.BadgeUpdateManager.getTemplateContent(type);

    // Get the badge element so we can add the number for the badge
    var badgeElement = xml.getElementsByTagName("badge")[0];
    badgeElement.setAttribute("value", number.toString());

    // Create Notification
    var badge = new notifications.BadgeNotification(xml);

    // Push the notification so the badge gets updated
    var updater = notifications.BadgeUpdateManager.createBadgeUpdaterForApplication();
    updater.update(badge);
  }


  // Run and get the data counts
  BackgroundData.processAll(function (totalItems) {

    // Update Badge
    updateBadge(totalItems);

    // Mark task as complete
    close();
  });

})();