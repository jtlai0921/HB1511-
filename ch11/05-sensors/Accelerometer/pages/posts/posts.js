// postsPage.js
(function () {
  "use strict";
  
  var syn, url;

  // This function is called whenever a user navigates to this page. It
  // populates the page elements with the app's data.
  function ready(element, options) {
    var accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
            
    // download the feed
    this.feed = options.feed;
    var pageTitle = element.querySelector(".pagetitle");
    pageTitle.innerText = this.feed.title;

    this.section = document.querySelector("section[role=main]");
    this.section.innerHTML = "<p>downloading...</p>";
        
    // download using WinRT
    syn = new Windows.Web.Syndication.SyndicationClient();
    url = new Windows.Foundation.Uri(this.feed.url);
    syn.retrieveFeedAsync(url).done(processPosts.bind(this), downloadError.bind(this));

    if (accelerometer) {
      accelerometer.addEventListener('shaken', function (e) {
        element.querySelector(".pagetitle").innerText = "SHAKEN! Refreshing...";

        syn.retrieveFeedAsync(url).then(processPosts, downloadError).done(function () {
          element.querySelector(".pagetitle").innerText = options.feed.title;
        });
      });
    }
  }
  
  // process using WinRT
  function processPosts(request) {
    // clear the progress indicator
    document.querySelector("section[role=main]").innerHTML = "";

    // iterate over the items
    for (var i = 0, len = request.items.length; i < len; i++) {
      var item = request.items[i];
      var parent = document.createElement("div");
      appendDiv(parent, item.title.text, "postTitle");
      appendDiv(parent, item.publishedDate, "postDate");
      appendDiv(parent, item.summary.text, "postContent");
      document.querySelector("section[role=main]").appendChild(parent);
    }
  }

  function appendDiv(parent, html, className) {
    var div = document.createElement("div");
    div.innerHTML = toStaticHTML(html);
    div.className = className;
    parent.appendChild(div);
  }

  function downloadError(feed) {
    this.section.innerHTML = "<p>error</p>";
  }

  WinJS.UI.Pages.define("/pages/posts/posts.html", {
    ready: ready,
  });
})();
