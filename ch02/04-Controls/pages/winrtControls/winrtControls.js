(function () {
  "use strict";

  var popups = Windows.UI.Popups;

  function messageBox(content, title) {
    var mb = new popups.MessageDialog(content);
    if (title) { mb.title = title; }
    mb.showAsync();
  }

  WinJS.UI.Pages.define("/pages/winrtControls/winrtControls.html", {
    ready: function (element, options) {
      popupmenuTarget.onclick = function () {
        var menu = new popups.PopupMenu();
        menu.commands.push(new popups.UICommand("one", null, 1));
        menu.commands.push(new popups.UICommand("two", null, 2));
        //menu.commands.push(new popups.UICommand("3", null, 3));
        //menu.commands.push(new popups.UICommand("4", null, 4));
        //menu.commands.push(new popups.UICommand("5", null, 5));
        //menu.commands.push(new popups.UICommand("6", null, 6));
        //menu.commands.push(new popups.UICommand("7", null, 1));
        //menu.commands.push(new popups.UICommand("8", null, 1));

        // TODO: how to put this where the user clicked/tapped?
        menu.showAsync({ x: 120, y: 360 }).done(function (e) {
          // do something with e.label and/or e.id
          if (e) {
            messageBox("menu item clicked: id= " + e.id + ", label=" + e.label);
          }
        });
      };

      messageboxTarget.onclick = function () {
        messageBox("and welcome to my message box!", "Hello!");
      };
    },
  });
})();
