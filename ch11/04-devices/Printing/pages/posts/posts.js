// postsPage.js
(function () {
  "use strict";

  function initPrint() {
    var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();

    printManager.addEventListener('printtaskrequested', function print (printEvent) {
      printEvent.request.createPrintTask("Print Blog", function (args) {
        args.setSource(MSApp.getHtmlPrintDocumentSource(document));
      });
    });

    document.getElementById('print').addEventListener('click', function () {
      Windows.Graphics.Printing.PrintManager.showPrintUIAsync();
    });
  }

  // This function is called whenever a user navigates to this page. It
  // populates the page elements with the app's data.
  function ready(element, options) {
    initPrint();

    // download the feed
    this.feed = options.feed;
    var pageTitle = element.querySelector(".pagetitle");
    pageTitle.innerText = this.feed.title;

    this.section = document.querySelector("section[role=main]");
    this.section.innerHTML = "<p>downloading...</p>";

    //// download using XMLHttpRequest
    //WinJS.xhr({ url: this.feed.url }).done(processPosts.bind(this), downloadError.bind(this));

    // download using WinRT
    var syn = new Windows.Web.Syndication.SyndicationClient();
    var url = new Windows.Foundation.Uri(this.feed.url);
    syn.retrieveFeedAsync(url).done(processPosts.bind(this), downloadError.bind(this));
  }

  //// process using XMLHttpRequest
  //function processPosts(request) {
  //  // clear the progress indicator
  //  this.section.innerHTML = "";

  //  // parse the RSS
  //  var items = request.responseXML.selectNodes("//item");
  //  if (items.length == 0) { downloadError(); }

  //  for (var i = 0, len = items.length; i < len; i++) {
  //    var item = items[i];
  //    var parent = document.createElement("div");
  //    appendDiv(parent, item.selectNodes("title")[0].text, "postTitle");
  //    appendDiv(parent, item.selectNodes("pubDate")[0].text, "postDate");
  //    appendDiv(parent, item.selectNodes("description")[0].text, "postContent");
  //    this.section.appendChild(parent);
  //  }
  //}

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
    div.className = className;
    parent.appendChild(div);
  }

  function downloadError(feed) {
    this.section.innerHTML = "<p>error</p>";
  }

  WinJS.UI.Pages.define("/pages/posts/posts.html", {
    ready: ready
  });
})();
