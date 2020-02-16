// postsPage.js
(function () {
  "use strict";

  WinJS.UI.Pages.define("/pages/postsPage/postsPage.html", {
    ready: function (element, options) {
      // download the feed
      this.feed = options.feed;
      var pageTitle = element.querySelector(".pagetitle");
      pageTitle.innerText = this.feed.title;
      this.section = document.querySelector("section[role=main]");
      this.section.innerHTML = "<p>downloading...</p>";

      // download using WinRT
      var syn = new Windows.Web.Syndication.SyndicationClient();
      var url = new Windows.Foundation.Uri(this.feed.url);
      syn.retrieveFeedAsync(url).done(processPosts.bind(this), downloadError.bind(this));
    }
  });

  // process using WinRT
  function processPosts(request) {
    // clear the progress indicator
    this.section.innerHTML = "";

    // iterate over the items
    for (var i = 0, len = request.items.length; i < len; i++) {
      var item = request.items[i];
      var parent = document.createElement("div");
      appendDiv(parent, item.title.text, "postTitle");
      appendDiv(parent, item.publishedDate, "postDate");
      appendDiv(parent, item.summary.text, "postContent");
      this.section.appendChild(parent);
    }
  }

  function appendDiv(parent, html, className) {
    var div = document.createElement("div");
    div.innerHTML = toStaticHTML(html);
    div.className = className; parent.appendChild(div);
  }

  function downloadError(feed) {
    this.section.innerHTML = "<p>error</p>";
  }

})();
