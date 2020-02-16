(function () {
  "use strict";

  // set up the data
  function grouper(item) { return item.group; }
  window.items = new WinJS.Binding.List(["one", "two", "three", "four", "five"]);
  window.groupedItems = new WinJS.Binding.List([
      { group: "numbers", value: 1 },
      { group: "numbers", value: 2 },
      { group: "numbers", value: 3 },
      { group: "numbers", value: 4 },
      { group: "numbers", value: 5 },
      { group: "symbols", value: "!" },
      { group: "symbols", value: "@" },
      { group: "symbols", value: "#" },
      { group: "symbols", value: "$" },
      { group: "symbols", value: "%" },
      { group: "words", value: "one" },
      { group: "words", value: "two" },
      { group: "words", value: "three" },
      { group: "words", value: "four" },
      { group: "words", value: "five" },
  ]).createGrouped(grouper, grouper);

  WinJS.UI.Pages.define("/pages/winjsControls/winjsControls.html", {
    ready: function (element, options) {
      // set up the flyout
      showFlyout.onclick = function () {
        flyout.winControl.show(showFlyout);
      };

      zoomButton.onclick = function () {
        zoomer.winControl.zoomedOut = !zoomer.winControl.zoomedOut;
      };

      // set up tooltip on an existing element (even if it's already a control)
      new WinJS.UI.Tooltip(toggle, { innerHTML: "<h2>now <i>this</i> is a <b style='color: red'>tooltip</b>!</h2>" });
    },
  });
})();
