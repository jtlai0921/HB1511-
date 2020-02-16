// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
  "use strict";

  var contacts = Windows.ApplicationModel.Contacts;

  WinJS.UI.Pages.define("/pages/contacts/contacts.html", {
    ready: function (element, options) {
      // keep reference to ContactPickerUI object from OS
      this.picker = options.contactPickerUI;

      // if the user removes a contact, let us know
      this.picker.addEventListener("contactremoved", oncontactremoved.bind(this));

      // handle the selection of a contact
      this.contactList = element.querySelector("#contactList").winControl;
      this.contactList.addEventListener("iteminvoked", oncontactselected.bind(this));
    },

    unload: function () {
      // the picker lives on after we do, so clean up
      picker.removeEventListener("contactremoved", oncontactremoved.bind(this));
    },

  });

  function oncontactremoved(args) {
    // the id of the removed item is passed into function
    var id = parseInt(args.id);
    var contactList = this.contactList;

    // find the item with that id
    Data.sampleContacts.forEach(function (item) {
      if (item.id == id) {
        contactList.selection.remove(Data.sampleContacts.indexOf(item));
        return false; // break loop
      }
    });
  }

  function oncontactselected(args) {
    var selectedIndex = args.detail.itemIndex;
    if (selectedIndex > -1) {
      var item = Data.sampleContacts.getAt(selectedIndex);
      if (this.picker.containsContact(item.id)) {
        this.picker.removeContact(item.id);
      }
      else {
        addContact(this.picker, item);
      }
    }
  }

  function addContact(picker, item) {
    // create the contact item
    var contact = new Windows.ApplicationModel.Contacts.Contact();

    // add the properties
    contact.name = item.name;
    contact.fields.append(new contacts.ContactField(item.email,
      contacts.ContactFieldType.email,
      contacts.ContactFieldCategory.work));
    contact.fields.append(new contacts.ContactField(item.phone,
      contacts.ContactFieldType.phoneNumber,
      contacts.ContactFieldCategory.work));

    // add the contact
    var result = picker.addContact(item.id, contact);

    // check for errors
    switch (result) {
      case contacts.Provider.AddContactResult.added:
      case contacts.Provider.AddContactResult.alreadyAdded:
        break; // OK

      case contacts.Provider.AddContactResult.unavailable:
      default:
        break; // TODO: adding contact failed -- show an error
    }
  }
})();
