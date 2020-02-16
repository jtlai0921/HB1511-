(function () {
  "use strict";

  // a global binding list of items
  window.items = new WinJS.Binding.List();

  window.people = new WinJS.Binding.List([
    { name: "John", age: 18, favoriteColor: "red" },
    { name: "Tom", age: 16, favoriteColor: "green" },
    { name: "Chris", age: 42, favoriteColor: "blue" },
  ]);

  // sort by name
  window.sortedPeople = people.
      createSorted(function (lhs, rhs) {
        return lhs.name.localeCompare(rhs.name); });

  // filter by age (adults only)
  window.filteredPeople = people.
        createFiltered(function (p) { return p.age > 17; });

  // changes to the underlying data are reflected in the live views
  var person = { name: "Pete", age: 17, favoriteColor: "black" };
  people.push(person);

  // filterd by age (minors) and sorted by name
  window.filteredSortedPeople = people.
        createFiltered(function (p) { return p.age < 18; }).
        createSorted(function (lhs, rhs) { return lhs.name.localeCompare(rhs.name); });

  // group by age
  //window.groupedPeople = people.
  //  createGrouped(function (p) { return p.age < 18 ? "minor" : "adult" });
  function groupKeySelector(p) { return p.age < 18 ? "minor" : "adult"; };
  function groupDataSelector(p) { return p.age < 18 ? "minor" : "adult"; };
  window.groupedPeople = people.createGrouped(groupKeySelector, groupDataSelector);

  // group by age and sorted by name
  window.groupedSortedPeople = people.
        createGrouped(function (p) { return p.age < 18 ? "minor" : "adult"; }).
        createSorted(function (lhs, rhs) { return -lhs.name.localeCompare(rhs.name); });

  // sorted by name and group by age
  window.sortedGroupedPeople = people.
        createSorted(function (lhs, rhs) { return -lhs.name.localeCompare(rhs.name); }).
        createGrouped(function (p) { return p.age < 18 ? "minor" : "adult" });

  (function () {
    // fancy group by age
    var groups = [{ key: 1, name: "Minor" }, { key: 2, name: "Adult" }];
    function groupKeySelector(p) { return p.age < 18 ? groups[0].key : groups[1].key; };
    function groupDataSelector(p) { return p.age < 18 ? groups[0] : groups[1]; };
    window.fancyGroupedPeople = people.createGrouped(groupKeySelector, groupDataSelector);
  })();


  WinJS.UI.Pages.define("/pages/home/home.html", {
    ready: function (element, options) {
      // binding list over time
      [0, 1, 2].forEach(function (i) {
        WinJS.Promise.timeout(500 * (i + 1)).done(function () {
          // add an item to the binding list, updating the ListView
          items.push(i);
        });
      });

      // manual template rendering
      var template = itemTemplate.winControl;
      template.render(person).
        done(function (element) { peteDiv.appendChild(element); });

      (function () {
        // using the built-in array
        var array = [];
        array.push("one");
        array.push("two");
        array.push("three");

        var x = array[0]; // x = "one"
        var y = array[1]; // y = "two"

        array[2] = "THREE";
        var z = array[2]; // z = "THREE";
      })();

      (function () {
        // using the WinJS binding list
        var list = new WinJS.Binding.List();
        list.push("one");
        list.push("two");
        list.push("three");

        var x = list.getAt(0); // x = "one"
        var y = list.getAt(1); // y = "two"

        list.setAt(2, "THREE");
        var z = list.getAt(2); // z = "THREE";
      })();
    }
  });
})();
