(function () {
    "use strict";

    var feeds = new WinJS.Binding.List([
      { title: "Brandon Satrom", url: "http://feeds.feedburner.com/userinexperience/tYGT" },
      { title: "Chris Sells", url: "http://sellsbrothers.com/posts/?format=rss" },
      { title: "Channel 9", url: "http://channel9.msdn.com/Feeds/RSS" },
    ]);

    function ready(element, options) {
      // TODO: Initialize the fragment here.

      // Show the feeds
      var section = element.querySelector("section");
      section.innerHTML = "";

      feeds.forEach(function (feed) {
        var div = document.createElement("div");
        div.innerText = feed.title;
        section.appendChild(div);
      });
    }
  
    WinJS.Utilities.markSupportedForProcessing(feedInvoked);
    function feedInvoked(event) {
      if (event) { 
        var f = feeds.getAt(event.detail.itemIndex);
        WinJS.Navigation.navigate("/pages/posts/posts.html", { feed: f });
      }
    }

    WinJS.Namespace.define('Feed', {
      feeds: feeds,
      feedInvoked: feedInvoked
    });

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
        }
    });
})();
