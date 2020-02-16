(function () {
    "use strict";

    var invoke = function (e) {
        var feed = MYAPP.feeds.getAt(e.detail.itemIndex);
        WinJS.Navigation.navigate("/pages/posts/posts.html", { feed: feed });
    };
    WinJS.Utilities.markSupportedForProcessing(invoke);

    WinJS.Namespace.define("MYAPP", {
        feeds: new WinJS.Binding.List([
          { title: "Brandon Satrom", url: "http://feeds.feedburner.com/userinexperience/tYGT" },
          { title: "Chris Sells", url: "http://sellsbrothers.com/posts/?format=rss" },
          { title: "Channel 9", url: "http://channel9.msdn.com/Feeds/RSS" },
        ]),
        feedInvoked: invoke
    });

    // This function is called whenever a user navigates to this page. It
    // populates the page elements with the app's data.
    function ready(element, options) {
        // TODO: Initialize the fragment here.

        //// Show the feeds
        //var section = element.querySelector("section");
        //section.innerHTML = "";

        //feeds.forEach(function (feed) {
        //  var div = document.createElement("div");
        //  div.innerText = feed.title;
        //  section.appendChild(div);
        //});
    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: ready
    });
})();
