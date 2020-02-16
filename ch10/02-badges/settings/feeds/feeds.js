// settings/feeds/feeds.js
(function () {
  "use strict";

  WinJS.UI.Pages.define("/settings/feeds/feeds.html", {
    ready: function (element, options) {
      // show the current values
      feed1enabled.checked = Data.getSetting("feed1enabled");
      feed2enabled.checked = Data.getSetting("feed2enabled");
      feed3enabled.checked = Data.getSetting("feed3enabled");
      showNotifications.winControl.checked = Data.getSetting("showNotifications");

      // handle the changes
      feed1enabled.onchange = this.checkChange;
      feed2enabled.onchange = this.checkChange;
      feed3enabled.onchange = this.checkChange;
      showNotifications.winControl.addEventListener("change", this.checkChange);
    },

    checkChange: function (e) {
      switch (e.srcElement.id) {
        case "feed1enabled":
        case "feed2enabled":
        case "feed3enabled":
          Data.setSetting(e.srcElement.id, e.srcElement.checked);
          break;

        case "showNotifications":
          Data.setSetting("showNotifications", e.srcElement.winControl.checked);
          break;
      }
    },

  });
})();
