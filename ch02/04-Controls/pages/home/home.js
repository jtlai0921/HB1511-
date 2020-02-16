(function () {
  "use strict";

  var nav = WinJS.Navigation;

  window.homePage = WinJS.UI.Pages.define("/pages/home/home.html", {
    ready: function (element, options) {
      htmlControlsItem.onclick = function () { nav.navigate("/pages/htmlControls/htmlControls.html"); };
      winrtControlsItem.onclick = function () { nav.navigate("/pages/winrtControls/winrtControls.html"); };
      winjsControlsItem.onclick = function () { nav.navigate("/pages/winjsControls/winjsControls.html"); };
      customControlsItem.onclick = function () { nav.navigate("/pages/customControls/customControls.html"); };
    }
  });
})();
