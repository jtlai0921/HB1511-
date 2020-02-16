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

      // download using XMLHttpRequest by creating a promise and
      // telling it what to do when it's done

      // the long way
      var xhrPromise = WinJS.xhr({ url: this.feed.url });
      xhrPromise.done(processPosts.bind(this), downloadError.bind(this));

      // the short way (recommended)
      WinJS.xhr({ url: this.feed.url }).done(processPosts.bind(this), downloadError.bind(this));
    }
  });

  // process using XMLHttpRequest
  function processPosts(request) {
    // clear the progress indicator
    this.section.innerHTML = "";

    // parse the RSS
    var items = request.responseXML.querySelectorAll("item");
    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      var parent = document.createElement("div");
      appendDiv(parent, item.querySelector("title").textContent, "postTitle");
      appendDiv(parent, item.querySelector("pubDate").textContent, "postDate");
      appendDiv(parent, item.querySelector("description").textContent, "postContent");
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
