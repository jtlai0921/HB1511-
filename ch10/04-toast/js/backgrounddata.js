// data.js
(function () {
  "use strict";

  // These three strings encode placeholder images. You will want to set the
  // backgroundImage property in your real data to be URLs to images.
  var lightGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
  var mediumGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY5g8dcZ/AAY/AsAlWFQ+AAAAAElFTkSuQmCC";
  var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";

  // Get a reference for an item, using the group key and item title as a
  // unique reference to the item that can be easily serialized.
  function getItemReference(item) {
    return [item.group.key, item.title];
  }

  function resolveGroupReference(key) {
    for (var i = 0; i < groupedItems.groups.length; i++) {
      if (groupedItems.groups.getAt(i).key === key) {
        return groupedItems.groups.getAt(i);
      }
    }
  }

  function resolveItemReference(reference) {
    for (var i = 0; i < groupedItems.length; i++) {
      var item = groupedItems.getAt(i);
      if (item.group.key === reference[0] && item.title === reference[1]) {
        return item;
      }
    }
  }

  // This function returns a WinJS.Binding.List containing only the items
  // that belong to the provided group.
  function getItemsFromGroup(group) {
    return list.createFiltered(function (item) { return item.group.key === group.key; });
  }

  var list = new WinJS.Binding.List();
  var groupedItems = list.createGrouped(
      function groupKeySelector(item) { return item.group.key; },
      function groupDataSelector(item) { return item.group; }
  );

  // default values and in-memory settings cache
  var showNotifications = true;
  var feeds = [
    { key: "feed1", title: "Brandon Satrom", subtitle: "blog", backgroundImage: darkGray, description: "blog", url: "http://feeds.feedburner.com/userinexperience/tYGT", enabled: true },
    { key: "feed2", title: "Chris Sells", subtitle: "blog", backgroundImage: lightGray, description: "blog", url: "http://sellsbrothers.com/posts/?format=rss", enabled: true },
    { key: "feed3", title: "Channel 9", subtitle: "blog", backgroundImage: mediumGray, description: "blog", url: "http://channel9.msdn.com/Feeds/RSS", enabled: true },
  ];

  var settings = Windows.Storage.ApplicationData.current.localSettings.values;
  if (settings.hasKey("feeds")) { feeds = JSON.parse(settings.feeds); }
  if (settings.hasKey("showNotifications")) { showNotifications = settings.showNotifications; }

  var completeCallback = null;

  function processAll(callback) {
    // set callback for finished
    if (callback) completeCallback = callback;

    // process all feeds at app startup
    feeds.forEach(processFeed);
  }

  var feedCount = feeds.length;

  // process each feed as needed
  function processFeed(feed) {
    // clear the list of items from this feed
    if (resolveGroupReference(feed.key)) {
      for (var i = list.length - 1; i >= 0; i--) {
        if (list.getAt(i).group.key == feed.key) {
          list.splice(i, 1);
        }
      }
    }

    // download the feed
    if (feed.enabled) {
      var syn = new Windows.Web.Syndication.SyndicationClient();
      var url = new Windows.Foundation.Uri(feed.url);
      syn.retrieveFeedAsync(url).done(processPosts.bind(feed));
    }
  }

  // process the downloaded posts
  function processPosts(request) {
    var feed = this;
    request.items.forEach(function (item) {
      var post = {
        group: feed,
        title: item.title.text,
        subtitle: item.publishedDate,
        description: "post",
        content: "", 
        backgroundImage: feed.backgroundImage,
      };

      // let the list know about each post
      list.push(post);
    });

    // Deal with the completeness of the post processing
    feedCount--;

    // If they've registered a callback, call it when we're done
    if (completeCallback && feedCount == 0) {
      completeCallback(list.length);
    }


  }

  function findFeed(key) {
    return feeds.filter(function (feed) { return feed.key == key; })[0];
  }

  function getSetting(name) {
    switch (name) {
      case "feed1enabled":
      case "feed2enabled":
      case "feed3enabled":
        return findFeed(name.substr(0, 5)).enabled;
        break;

      case "showNotifications":
        return showNotifications;
        break;
    }
  }

  function setSetting(name, value) {
    switch (name) {
      case "feed1enabled":
      case "feed2enabled":
      case "feed3enabled":
        var feed = findFeed(name.substr(0, 5));
        if (feed.enabled == value) { return; }
        feed.enabled = value;
        settings.feeds = JSON.stringify(feeds);
        processFeed(feed);
        break;

      case "showNotifications":
        if (showNotifications == value) { return; }
        showNotifications = value;
        settings.showNotifications = showNotifications;
        break;
    }
  }

  WinJS.Namespace.define("BackgroundData", {
    processAll: processAll, // Kick off download
  });
})();
