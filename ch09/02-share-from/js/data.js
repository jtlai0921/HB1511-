// data.js
(function () {
  "use strict";

  var groupDescription = "Group Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor scelerisque lorem in vehicula. Aliquam tincidunt, lacus ut sagittis tristique, turpis massa volutpat augue, eu rutrum ligula ante a ante";
  var itemDescription = "Item Description: Pellentesque porta mauris quis interdum vehicula urna sapien ultrices velit nec venenatis dui odio in augue cras posuere enim a cursus convallis neque turpis malesuada erat ut adipiscing neque tortor ac erat";
  var itemContent = "<p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat";

  // These three strings encode placeholder images. You will want to set the
  // backgroundImage property in your real data to be URLs to images.
  var lightGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
  var mediumGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY5g8dcZ/AAY/AsAlWFQ+AAAAAElFTkSuQmCC";
  var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";

  // Create a StreamReference from the app's store logo
  var streams = Windows.Storage.Streams;
  var uri = new Windows.Foundation.Uri("ms-appx:///images/storelogo.png");
  var appIconStreamReference = streams.RandomAccessStreamReference.createFromUri(uri);

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

  // process all feeds at app startup
  feeds.forEach(processFeed);

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
        content: toStaticHTML(item.summary.text),
        backgroundImage: feed.backgroundImage,
        originalUri: item.links[0].uri
      };

      // let the list know about each post
      list.push(post);
    });
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

  WinJS.Namespace.define("Data", {
    items: groupedItems,
    groups: groupedItems.groups,
    getItemsFromGroup: getItemsFromGroup,
    getItemReference: getItemReference,
    resolveGroupReference: resolveGroupReference,
    resolveItemReference: resolveItemReference,
    getSetting: getSetting, // get the current setting value
    setSetting: setSetting, // set a new setting value
    appIconStreamReference: appIconStreamReference, // AppIcon
  });
})();
