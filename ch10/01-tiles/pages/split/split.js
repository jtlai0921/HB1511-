// split.js
(function () {
"use strict";

var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
var binding = WinJS.Binding;
var nav = WinJS.Navigation;
var ui = WinJS.UI;
var utils = WinJS.Utilities;

WinJS.UI.Pages.define("/pages/split/split.html", {

  /// <field type="WinJS.Binding.List" />
  items: null,
  /// <field type="Object" />
  group: null,
  itemSelectionIndex: -1,

  // This function checks if the list and details columns should be displayed
  // on separate pages instead of side-by-side.
  isSingleColumn: function () {
    var viewState = Windows.UI.ViewManagement.ApplicationView.value;
    return (viewState === appViewState.snapped || viewState === appViewState.fullScreenPortrait);
  },

  // This function is called whenever a user navigates to this page. It
  // populates the page elements with the app's data.
  ready: function (element, options) {
    var listView = element.querySelector(".itemlist").winControl;


    // Store information about the group and selection that this page will
    // display.
    this.group = (options && options.groupKey) ? Data.resolveGroupReference(options.groupKey) : Data.groups.getAt(0);
    this.items = Data.getItemsFromGroup(this.group);
    this.itemSelectionIndex = (options && "selectedIndex" in options) ? options.selectedIndex : -1;

    element.querySelector("header[role=banner] .pagetitle").textContent = this.group.title;

    // Set up the ListView.
    listView.itemDataSource = this.items.dataSource;
    listView.itemTemplate = element.querySelector(".itemtemplate");
    listView.onselectionchanged = this.selectionChanged.bind(this);
    listView.layout = new ui.ListLayout();

    this.updateVisibility();
    if (this.isSingleColumn()) {
      if (this.itemSelectionIndex >= 0) {
        // For single-column detail view, load the article.
        binding.processAll(element.querySelector(".articlesection"), this.items.getAt(this.itemSelectionIndex));
      }
    } else {
      if (nav.canGoBack && nav.history.backStack[nav.history.backStack.length - 1].location === "/pages/split/split.html") {
        // Clean up the backstack to handle a user snapping, navigating
        // away, unsnapping, and then returning to this page.
        nav.history.backStack.pop();
      }
      // If this page has a selectionIndex, make that selection
      // appear in the ListView.
      listView.selection.set(Math.max(this.itemSelectionIndex, 0));
    }

    // handler clicking on the "Pin the Start Screen" appbar button
    pinButton.onclick = this.createSecondaryTile.bind(this);
  },

  // create a secondary tile when the user chooses the "Pin to Start Screen"
  // appbar button
  createSecondaryTile: function () {
    var startScreen = Windows.UI.StartScreen;

    // use group key for tile ID since we only want one per group
    var id = this.group.key;

    // create secondary tile
    var tile = new startScreen.SecondaryTile(id);
    tile.arguments = this.group.title;
    tile.logo = new Windows.Foundation.Uri("ms-appx:///images/logo.png");
    tile.displayName = this.group.title;
    tile.shortName = this.group.title;
    tile.foregroundText = startScreen.ForegroundText.light;
    tile.tileOptions = startScreen.TileOptions.showNameOnLogo;

    // set options so that tile is re-added when installed on separate machine
    //tile.tileOptions = startScreen.TileOptions.copyOnDeployment; 

    // set options to place the confirmation flyout above the "Pin" button
    var r = pinButton.getBoundingClientRect();
    var previewRect = { x: r.left, y: r.top, width: r.width, height: r.height };
    var placement = Windows.UI.Popups.Placement.above;

    // add the tile
    tile.requestCreateForSelectionAsync(previewRect, placement);
  },

  selectionChanged: function (args) {
    var listView = document.body.querySelector(".itemlist").winControl;
    var details;
    var that = this;
    // By default, the selection is restriced to a single item.
    listView.selection.getItems().done(function updateDetails(items) {
      if (items.length > 0) {
        that.itemSelectionIndex = items[0].index;
        if (that.isSingleColumn()) {
          // If snapped or portrait, navigate to a new page containing the
          // selected item's details.
          nav.navigate("/pages/split/split.html", { groupKey: that.group.key, selectedIndex: that.itemSelectionIndex });
        }
        else {
          // If fullscreen or filled, update the details column with new data.
          details = document.querySelector(".articlesection");
          binding.processAll(details, items[0].data);
          details.scrollTop = 0;
        }

        that.updateTile(items[0]);
      }
    });
  },

  unload: function () {
    this.items.dispose();
  },

  // update the RSS Reader tile with the last item you read
  updateTile: function (item) {
    // specify the template you want to use
    var notifications = Windows.UI.Notifications;
    var template = notifications.TileTemplateType.tileWideImageAndText01;

    // get the XML structure for the update
    var xml = notifications.TileUpdateManager.getTemplateContent(template);

    // update the text element
    var text = xml.getElementsByTagName("text")[0];
    text.appendChild(xml.createTextNode("Just Read: " + item.data.title));

    // update the image element
    var img = xml.getElementsByTagName("image")[0];
    img.setAttribute("src", "ms-appx:///images/updatelogo.png");
    //img.setAttribute("src", "http://sellsbrothers.com/content/images/sellsbrothers_logo.jpg");
    img.setAttribute("alt", item.data.title);

    // create the update for smaller tile size
    //var squareTemplate = notifications.TileTemplateType.tileSquareText02;
    var squareTemplate = notifications.TileTemplateType.tileSquarePeekImageAndText01;

    // get the XML structure for the update
    var squareXml = notifications.TileUpdateManager.getTemplateContent(squareTemplate);

    // update the text element
    var squareTextElements = squareXml.getElementsByTagName("text");
    squareTextElements[0].appendChild(squareXml.createTextNode("just read"));
    squareTextElements[1].appendChild(squareXml.createTextNode(item.data.title));
    squareTextElements[2].appendChild(squareXml.createTextNode("peeking under"));
    squareTextElements[3].appendChild(squareXml.createTextNode("tiles is fun!"));

    // update the image element (for peeking)
    var squareImgElement = squareXml.getElementsByTagName("image")[0];
    squareImgElement.setAttribute("src", "ms-appx:///images/logo.png");
    squareImgElement.setAttribute("alt", item.data.title);

    // merge the two templates
    var bindingNode = xml.importNode(squareXml.getElementsByTagName("binding")[0], true);
    var visualNode = xml.getElementsByTagName("visual")[0];
    visualNode.appendChild(bindingNode);

    // deliver in 1 minute, measured in milliseconds
    var delivery = new Date().getTime() + (60 * 1000);

    // create the update
    //var update = new notifications.TileNotification(xml);
    var update = new notifications.ScheduledTileNotification(xml, new Date(delivery));

    // expire in 10 minutes, measured in milliseconds
    var expiration = new Date().getTime() + (10 * 60 * 1000);
    update.expirationTime = new Date(expiration);

    // update the tile
    //notifications.TileUpdateManager.createTileUpdaterForApplication().update(update);
    notifications.TileUpdateManager.createTileUpdaterForApplication().addToSchedule(update);
  },

  // This function updates the page layout in response to viewState changes.
  updateLayout: function (element, viewState, lastViewState) {
    /// <param name="element" domElement="true" />
    /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
    /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

    var listView = element.querySelector(".itemlist").winControl;
    var firstVisible = listView.indexOfFirstVisible;
    this.updateVisibility();

    var handler = function (e) {
      listView.removeEventListener("contentanimating", handler, false);
      e.preventDefault();
    }

    if (this.isSingleColumn()) {
      listView.selection.clear();
      if (this.itemSelectionIndex >= 0) {
        // If the app has snapped into a single-column detail view,
        // add the single-column list view to the backstack.
        nav.history.current.state = {
          groupKey: this.group.key,
          selectedIndex: this.itemSelectionIndex
        };
        nav.history.backStack.push({
          location: "/pages/split/split.html",
          state: { groupKey: this.group.key }
        });
        element.querySelector(".articlesection").focus();
      } else {
        listView.addEventListener("contentanimating", handler, false);
        listView.indexOfFirstVisible = firstVisible;
        listView.forceLayout();
      }
    } else {
      // If the app has unsnapped into the two-column view, remove any
      // splitPage instances that got added to the backstack.
      if (nav.canGoBack && nav.history.backStack[nav.history.backStack.length - 1].location === "/pages/split/split.html") {
        nav.history.backStack.pop();
      }
      if (viewState !== lastViewState) {
        listView.addEventListener("contentanimating", handler, false);
        listView.indexOfFirstVisible = firstVisible;
        listView.forceLayout();
      }

      listView.selection.set(this.itemSelectionIndex >= 0 ? this.itemSelectionIndex : Math.max(firstVisible, 0));
    }
  },

  // This function toggles visibility of the two columns based on the current
  // view state and item selection.
  updateVisibility: function () {
    var oldPrimary = document.querySelector(".primarycolumn");
    if (oldPrimary) {
      utils.removeClass(oldPrimary, "primarycolumn");
    }
    if (this.isSingleColumn()) {
      if (this.itemSelectionIndex >= 0) {
        utils.addClass(document.querySelector(".articlesection"), "primarycolumn");
        document.querySelector(".articlesection").focus();
      } else {
        utils.addClass(document.querySelector(".itemlistsection"), "primarycolumn");
        document.querySelector(".itemlist").focus();
      }
    } else {
      document.querySelector(".itemlist").focus();
    }
  }
});
})();
