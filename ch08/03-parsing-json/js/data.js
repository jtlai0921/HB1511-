(function () {
  "use strict";

  var list = new WinJS.Binding.List();
  var groupedItems = list.createGrouped(
      function groupKeySelector(item) { return item.group.key; },
      function groupDataSelector(item) { return item.group; }
  );

  var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";
  var lightGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
  var mediumGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY5g8dcZ/AAY/AsAlWFQ+AAAAAElFTkSuQmCC";

  var searches = [
        { key: "group1", title: "Brandon Satrom", subtitle: "pictures", backgroundImage: darkGray, description: "Brandon Satrom images" },
        { key: "group2", title: "Chris Sells", subtitle: "pictures", backgroundImage: lightGray, description: "Chris Sells images" },
        { key: "group3", title: "kitties", subtitle: "pictures", backgroundImage: mediumGray, description: "kitty images" },
  ];

  searches.forEach(function (search) {
    var q = "https://api.datamarket.azure.com/Data.ashx/Bing/Search/v1/Image?Query=%27" +
            search.title + "%27&$top=12&$format=json";
    var user = "csells@sellsbrothers.com";
    var pw = "TODO"; // get own free Bing Search API key: http://bing.com/developers/

    WinJS.xhr({ url: q, user: user, password: pw }).done(function (request) {
      // parse the result
      var response = JSON.parse(request.responseText);
      var items = response.d.results;
      items.forEach(function (item) {
        // create an image for each item
        var image = {
          group: search,
          title: item.Title,
          subtitle: "",
          description: "image",
          content: "",
          backgroundImage: item.MediaUrl,
        };

        // let the list know about each post
        list.push(image);
      });
    });
  });

  WinJS.Namespace.define("Data", {
    items: groupedItems,
    groups: groupedItems.groups,
    getItemReference: getItemReference,
    getItemsFromGroup: getItemsFromGroup,
    resolveGroupReference: resolveGroupReference,
    resolveItemReference: resolveItemReference
  });

  // Get a reference for an item, using the group key and item title as a
  // unique reference to the item that can be easily serialized.
  function getItemReference(item) {
    return [item.group.key, item.title];
  }

  // This function returns a WinJS.Binding.List containing only the items
  // that belong to the provided group.
  function getItemsFromGroup(group) {
    return list.createFiltered(function (item) { return item.group.key === group.key; });
  }

  // Get the unique group corresponding to the provided group key.
  function resolveGroupReference(key) {
    for (var i = 0; i < groupedItems.groups.length; i++) {
      if (groupedItems.groups.getAt(i).key === key) {
        return groupedItems.groups.getAt(i);
      }
    }
  }

  // Get a unique item from the provided string array, which should contain a
  // group key and an item title.
  function resolveItemReference(reference) {
    for (var i = 0; i < groupedItems.length; i++) {
      var item = groupedItems.getAt(i);
      if (item.group.key === reference[0] && item.title === reference[1]) {
        return item;
      }
    }
  }

})();
