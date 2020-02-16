(function () {
    "use strict";

    var images = new WinJS.Binding.List([
			{ url: "images/assets/BostonCityFlow.jpg" },
			{ url: "images/assets/Chrysanthemum.jpg" },
			{ url: "images/assets/CostaRicanFrog.jpg" },
			{ url: "images/assets/Hydrangeas.jpg" },
			{ url: "images/assets/Jellyfish.jpg" },
			{ url: "images/assets/Koala.jpg" },
			{ url: "images/assets/Penguins.jpg" },
			{ url: "images/assets/PensiveParakeet.jpg" }
    ]);

    WinJS.Namespace.define('Photos', {
    	imageList: images
		});

    function setListViewLayout(viewState) {
    	var listView = document.querySelector('#imageContainer').winControl;
    	var stateEnum = Windows.UI.ViewManagement.ApplicationViewState;

    	if ((viewState === stateEnum.fullScreenPortrait) || (viewState === stateEnum.snapped)) {
    		listView.layout = new WinJS.UI.ListLayout();
    	} else {
    		listView.layout = new WinJS.UI.GridLayout();
    	}
    }

    function ready(element, options) {
			setListViewLayout(Windows.UI.ViewManagement.ApplicationView.value);
    }

    function updateLayout(element, viewState) {
    	setListViewLayout(viewState);
    }

    WinJS.UI.Pages.define("/html/homePage.html", {
    	ready: ready,
			updateLayout: updateLayout
    });
})();
