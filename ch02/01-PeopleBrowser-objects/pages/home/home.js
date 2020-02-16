// home.js
(function () {
  "use strict";

  WinJS.UI.Pages.define("/pages/home/home.html", {
    ready: function (element, options) {
      var people = [
        // notify binding listeners when these objects change
        WinJS.Binding.as({ name: "John", age: 18, favoriteColor: "red" }),
        WinJS.Binding.as({ name: "Tom", age: 16, favoriteColor: "green" }),
        WinJS.Binding.as({ name: "Chris", age: 42, favoriteColor: "blue" }),
      ];

      // bind the current person to the HTML elements in the section
      var section = element.querySelector("section[role=main]");
      var viewModel = WinJS.Binding.as({ current: 0, person: null });
      WinJS.Binding.processAll(section, viewModel);
      viewModel.bind("current", function (newValue, oldValue) {
        viewModel.person = people[newValue];
      });

      birthdayButton.onclick = function () {
        viewModel.person.age++;
      };

      // bind to the previous object
      previousButton.onclick = function () {
        // set the current index and let the binding do the work
        viewModel.current = (people.length + viewModel.current - 1) % people.length;
      };

      // bind to the next object
      nextButton.onclick = function () {
        // set the current index and let the binding do the work
        viewModel.current = (people.length + viewModel.current + 1) % people.length;
      };
    }
  });
})();
