(function () {
  "use strict";

  WinJS.UI.Pages.define("/pages/customControls/customControls.html", {
    ready: function (element, options) {
      var clock = new Samples.UI.ClockControl(clockControl1);
      //var clock = new Samples.UI.ClockControl(clockControl1, { color: 'red' });
      //clock.color = 'red'; // Can set options as part of construction or later
      clock.onfiveseconds = function (e) {
        // TODO: do something every 5 seconds
        var x = e;
      };

      clockControl2.winControl.addEventListener("fiveseconds", function (e) {
        // TODO: do something every 5 seconds
        var x = e;
      });

      //var s = "";
      //for (var prop in clock) {
      //  s += "<p>" + prop + "= " + clock[prop].toString() + "</p>";
      //}
    },
  });
})();
