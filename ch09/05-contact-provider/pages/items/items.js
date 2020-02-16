(function () {
  "use strict";

  var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
  var ui = WinJS.UI;

  ui.Pages.define("/pages/items/items.html", {

    // This function updates the ListView with new layouts
    initializeLayout: function (listView, viewState) {
      /// <param name="listView" value="WinJS.UI.ListView.prototype" />

      if (viewState === appViewState.snapped) {
        listView.layout = new ui.ListLayout();
      } else {
        listView.layout = new ui.GridLayout();
      }
    },

    itemInvoked: function (args) {
      var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
      WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
    },

    // This function is called whenever a user navigates to this page. It
    // populates the page elements with the app's data.
    ready: function (element, options) {
      var listView = element.querySelector(".itemslist").winControl;
      listView.itemDataSource = Data.groups.dataSource;
      listView.itemTemplate = element.querySelector(".itemtemplate");
      listView.oniteminvoked = this.itemInvoked.bind(this);

      var contacts = Windows.ApplicationModel.Contacts;
      element.querySelector("#cmdGetContact").addEventListener("click",
        function (args) {

          var contactsDiv = element.querySelector("#contactinfo");

          function addContactToScreen(contact) {
            var singleContact = document.createElement("div");
            singleContact.innerText = "You picked: " + contact.name; // + " " + contact.emails[0];
            contactsDiv.appendChild(singleContact);
          }
          

          // Create the picker
          var picker = new contacts.ContactPicker();

          // Specify the button text when selecting contact
          //picker.commitButtonText = "Select";

          // Specify you want the entire Contact
          //picker.selectionMode = contacts.ContactSelectionMode.contacts;

          // Specify the fields you want
          picker.selectionMode = contacts.ContactSelectionMode.fields;
          picker.desiredFields.append(contacts.KnownContactField.email);
          picker.desiredFields.append(contacts.KnownContactField.phoneNumber);

          // Get single contact
          //picker.pickSingleContactAsync().done(function (contact) {
          //  addContactToScreen(contact);
          //});

          // Get multiple contacts
          picker.pickMultipleContactsAsync().done(function (contacts) {
            // If any were picked
            if (contacts.length > 0) {
              // Go through the collection
              contacts.forEach(function (contact) {
                addContactToScreen(contact);
              });
            }
          });

        }, false);

      this.initializeLayout(listView, Windows.UI.ViewManagement.ApplicationView.value);
      listView.element.focus();

    },

    // This function updates the page layout in response to viewState changes.
    updateLayout: function (element, viewState, lastViewState) {
      /// <param name="element" domElement="true" />
      /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
      /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

      var listView = element.querySelector(".itemslist").winControl;
      if (lastViewState !== viewState) {
        if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
          var handler = function (e) {
            listView.removeEventListener("contentanimating", handler, false);
            e.preventDefault();
          }
          listView.addEventListener("contentanimating", handler, false);
          var firstVisible = listView.indexOfFirstVisible;
          this.initializeLayout(listView, viewState);
          listView.indexOfFirstVisible = firstVisible;
        }
      }
    }
  });
})();
