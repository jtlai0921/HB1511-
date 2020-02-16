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

  var feeds = [
    { key: "feed1", title: "Brandon Satrom", subtitle: "blog", backgroundImage: darkGray, description: "blog", url: "http://feeds.feedburner.com/userinexperience/tYGT" },
    { key: "feed2", title: "Chris Sells", subtitle: "blog", backgroundImage: lightGray, description: "blog", url: "http://sellsbrothers.com/posts/?format=rss" },
    { key: "feed3", title: "Channel 9", subtitle: "blog", backgroundImage: mediumGray, description: "blog", url: "http://channel9.msdn.com/Feeds/RSS" },
  ];

  var promises = [];
  function trackPromise(p) { promises.push(p); }
  function untrackPromise(p) { promises.splice(promises.indexOf(p), 1); }

  // grab a downloader for our downloading needs
  var downloader = new Windows.Networking.BackgroundTransfer.BackgroundDownloader();

  feeds.forEach(function (feed) {
    // download the feed
    var sto = Windows.Storage;
    var localFolder = sto.ApplicationData.current.localFolder;
    var promise = localFolder.createFileAsync(feed.key, sto.CreationCollisionOption.replaceExisting);
    trackPromise(promise); // keep the promise around for potential canceling

    promise.
      then(function (file) {
        // use the downloader to fill in the file we created
        var uri = new Windows.Foundation.Uri(feed.url);
        var download = downloader.createDownload(uri, file);

        feed.file = file;
        feed.download = download;

        return download.startAsync();
      }).
      then(processPosts.bind(feed), downloadError.bind(feed), downloadProgress.bind(feed)).
      done(function () { untrackPromise(promise); });
  });

  function processPosts() {
    // parse the RSS
    var feed = this;
    Windows.Data.Xml.Dom.XmlDocument.loadFromFileAsync(feed.file).done(function (rss) {
      var items = rss.selectNodes("//item");
      for (var i = 0, len = items.length; i < len; i++) {
        // create a post for each item
        var item = items[i];
        var post = {
          group: feed,
          title: item.selectSingleNode("title").innerText,
          subtitle: item.selectSingleNode("pubDate").innerText,
          description: "post",
          content: toStaticHTML(item.selectSingleNode("description").innerText),
          backgroundImage: feed.backgroundImage,
        };

        // let the list know about each post
        list.push(post);
      }
    });
  }

  function getEnumName(enumeration, value) {
    for (var name in enumeration) {
      if (enumeration[name] == value) { return name; }
    }
    return undefined;
  }

  function downloadError(error) {
    var feed = this;
    var status = Windows.Networking.BackgroundTransfer.BackgroundTransferError.getStatus(error.number);
    Debug.writeln("error: feed= " + feed.title + ", status= " + getEnumName(Windows.Web.WebErrorStatus, status) +
      ", error= " + error.number + ": " + error.description);
  }

  function downloadProgress() {
    var feed = this;
    var progress = feed.download.progress;
    var status = getEnumName(Windows.Networking.BackgroundTransfer.BackgroundTransferStatus, progress.status);
    Debug.writeln("progress: feed= " + feed.title + ", status= " + status +
      ", progress= " + progress.bytesReceived * 100 / progress.totalBytesToReceive + "%");
  }

  WinJS.Namespace.define("Data", {
    items: groupedItems,
    groups: groupedItems.groups,
    getItemsFromGroup: getItemsFromGroup,
    getItemReference: getItemReference,
    resolveGroupReference: resolveGroupReference,
    resolveItemReference: resolveItemReference
  });
})();
