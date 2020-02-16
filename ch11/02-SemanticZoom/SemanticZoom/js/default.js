(function () {
    "use strict";
		
    var images = new WinJS.Binding.List([
			{ url: "images/BostonCityFlow.jpg", caption: "Pretty awesome photo of Boston", category: "Cities" },
			{ url: "images/Chrysanthemum.jpg", caption: "Chris's favorite flower", category: "Flowers" },
			{ url: "images/Penguins.jpg", caption: "Win8 is the talk of the penguin community", category: "Animals" },
			{ url: "images/PensiveParakeet.jpg", caption: "The Bobby Fischer of Avian chess grandmasters", category: "Animals" },
			{ url: "images/CostaRicanFrog.jpg", caption: "A frog I once met in Costa Rica", category: "Animals" },
			{ url: "images/Jellyfish.jpg", caption: "Aren't Jellyfish cool?", category: "Animals" },
			{ url: "images/Hydrangeas.jpg", caption: "Brandon's favorite flower", category: "Flowers" },
			{ url: "images/Koala.jpg", caption: "Hello there!", category: "Animals" }
    ]);

    var groupedImages = images.createGrouped(getKey, getData, sorter);

    function getKey(item) {
      return item.category;
    }

    function getData(item) {
      return {
        title: item.category
      }
    }

    function sorter(leftItem, rightItem) {
      return leftItem.charCodeAt(0) - rightItem.charCodeAt(0);
    }

    WinJS.Namespace.define('Photos', {
      imageList: images,
      groupedImages: groupedImages
    });

    var app = WinJS.Application;

    app.onactivated = function (eventObject) {
        WinJS.UI.processAll();
    };

    app.start();
})();
