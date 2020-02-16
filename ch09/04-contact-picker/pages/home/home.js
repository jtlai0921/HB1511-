// home.js
(function () {
  "use strict";

  WinJS.UI.Pages.define("/pages/home/home.html", {
    ready: function (element, options) {
      pickContactsButton.onclick = pickContactsButton_click;
    }
  });

  function pickContactsButton_click() {
    // create the picker
    var contacts = Windows.ApplicationModel.Contacts;
    var picker = new contacts.ContactPicker();

    // we want the entire contact (default)
    //picker.selectionMode = contacts.ContactSelectionMode.contacts;

    // we only want contacts with phone numbers
    //picker.selectionMode = contacts.ContactSelectionMode.fields;
    //picker.desiredFields.append(contacts.KnownContactField.email);

    // get single contact
    //picker.pickSingleContactAsync().done(function (contact) {
    //  output.innerHTML = "";
    //  if (contact) { outputContactNameAndEmail(contact); }
    //  //if (contact) { outputContact(contact); }
    //});

    // get multiple contacts
    picker.pickMultipleContactsAsync().done(function (contacts) {
      output.innerHTML = "";
      if (contacts.length) {
        contacts.forEach(function (contact) {
          outputContactNameAndEmail(contact);
        });
      }
    });
  }

  function outputContactNameAndEmail(contact) {
    output.innerHTML += "<h2>name= " + contact.name + "</h2>";

    output.innerHTML += "<p>emails:</p><ul>";
    contact.emails.forEach(function (email) {
      output.innerHTML += "<li>" + email.value + "</li>";
    });
    output.innerHTML += "</ul>";
  }

  function dumpObject(obj) {
    var s = "";
    for (var key in obj) {
      s += key + "= " + obj[key] + ", ";
    }
    return s;
  }

  function outputContact(contact) {
    // name
    output.innerHTML += "<h2>name= " + contact.name + "</h2>";

    // emails
    output.innerHTML += "<p>emails:</p><ul>";
    contact.emails.forEach(function (email) {
      output.innerHTML += "<li>" + dumpObject(email) + "</li>";
    });
    output.innerHTML += "</ul>";

    // instantMessages
    output.innerHTML += "<p>instantMessages:</p><ul>";
    contact.instantMessages.forEach(function (instantMessage) {
      output.innerHTML += "<li>" + dumpObject(instantMessage) + "</li>";
    });
    output.innerHTML += "</ul>";

    // locations
    output.innerHTML += "<p>locations:</p><ul>";
    contact.locations.forEach(function (location) {
      output.innerHTML += "<li>" + dumpObject(location) + "</li>";
    });
    output.innerHTML += "</ul>";

    // phoneNumbers
    output.innerHTML += "<p>phoneNumbers:</p><ul>";
    contact.phoneNumbers.forEach(function (phoneNumber) {
      output.innerHTML += "<li>" + dumpObject(phoneNumber) + "</li>";
    });
    output.innerHTML += "</ul>";
  }

})();
