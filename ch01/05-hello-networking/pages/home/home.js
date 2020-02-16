(function () {
  "use strict";

  // define the feeds
  window.feeds = new WinJS.Binding.List([
    { title: "Brandon Satrom", url: "http://feeds.feedburner.com/userinexperience/tYGT" },
    { title: "Chris Sells", url: "http://sellsbrothers.com/posts/?format=rss" },
    { title: "Channel 9", url: "http://channel9.msdn.com/Feeds/RSS" },
  ]);

  WinJS.UI.Pages.define("/pages/home/home.html", {
    ready: function (element, options) {
      // let the ListView show the feeds
    }
  });

  // mark the event handler as safe for declarative use
  window.feedInvoked = WinJS.UI.eventHandler(function (e) {
    // navigate to the page to show the feed's posts
    var feed = feeds.getAt(e.detail.itemIndex);
    WinJS.Navigation.navigate("/pages/postsPage/postsPage.html", { feed: feed });
  });
})();
