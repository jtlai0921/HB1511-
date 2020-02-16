// backgroundtask.js
(function () {
  "use strict";

  // Import other scripts
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

  function showNotification(numberFound) {
    var notifications = Windows.UI.Notifications;

    var notifier = notifications.ToastNotificationManager.createToastNotifier();

    // ensure that we can show a notification
    if (notifier.setting == notifications.NotificationSetting.enabled) {

      // specify what kind of toast
      var type = notifications.ToastTemplateType.toastImageAndText01;

      // get the XML to modify
      var xml = notifications.ToastNotificationManager.getTemplateContent(type);

      // update the image
      var img = xml.getElementsByTagName("image")[0];
      img.setAttribute("src", "ms-appx:///images/logo.png");

      // update the text
      var txt = xml.getElementsByTagName("text")[0];
      txt.appendChild(xml.createTextNode("You have " + numberFound + " new posts"));

      //// optionally set the duration
      //xml.setAttribute("duration", "long");

      // get the toast element
      var node = xml.selectSingleNode("/toast");

      //// create the sound element
      //var sound = xml.createElement("audio");

      //// set a non-standard sound
      //sound.setAttribute("src", "ms-winsoundevent:Notification.Reminder");

      //// or make it silent
      //sound.setAttribute("silent", "true");

      //// add it to the toast
      //node.appendChild(sound);

      //// create the launch information to be sent to activate if tapped/clicked
      ////node.setAttribute("launch", "App Specific String passed down...can be JSON");
      node.setAttribute("launch", '{ "reason": "Toast", "url": "/foo/bar" }');

      // create the toast object
      var toast = new notifications.ToastNotification(xml);

      // show to the user
      notifier.show(toast);

      // create a scheduled Toast
      var delivery = new Date().getTime() + (1000 * 60 * 60); // now plus an hour
      var scheduledToast = new notifications.ScheduledToastNotification(xml, new Date(delivery));

      // schedule it
      notifier.addToSchedule(scheduledToast);
    }
  }

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
    showNotification(totalItems);

    // Mark task as complete
    close();
  });

})();