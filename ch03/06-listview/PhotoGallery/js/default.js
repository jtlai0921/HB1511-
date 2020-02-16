(function () {
    "use strict";
		
    var images = new WinJS.Binding.List([
			{ url: "images/BostonCityFlow.jpg", caption: "Pretty awesome photo of Boston" },
			{ url: "images/Chrysanthemum.jpg", caption: "Chris's favorite flower" },
			{ url: "images/Penguins.jpg", caption: "Win8 is the talk of the penguin community" },
			{ url: "images/PensiveParakeet.jpg", caption: "The Bobby Fischer of Avian chess grandmasters" },
			{ url: "images/CostaRicanFrog.jpg", caption: "A frog I once met in Costa Rica" },
			{ url: "images/Jellyfish.jpg", caption: "Aren't Jellyfish cool?" },
			{ url: "images/Hydrangeas.jpg", caption: "Brandon's favorite flower" },
			{ url: "images/Koala.jpg", caption: "Hello there!" }
    ]);

    WinJS.Namespace.define('Photos', {
    	imageList: images
    });

    var app = WinJS.Application;

    window.addEventListener('resize', function () {
        setListViewLayout(Windows.UI.ViewManagement.ApplicationView.value);
    });

    app.onactivated = function (eventObject) {
    	WinJS.UI.processAll();
    	setListViewLayout(Windows.UI.ViewManagement.ApplicationView.value);
    };

    function setListViewLayout(viewState) {
    	var listView = document.querySelector('#imgContainer').winControl;
    	var stateEnum = Windows.UI.ViewManagement.ApplicationViewState;

    	if ((viewState === stateEnum.fullScreenPortrait) || (viewState === stateEnum.snapped)) {
    		listView.layout = new WinJS.UI.ListLayout();
    	} else {
    		listView.layout = new WinJS.UI.GridLayout();
    	}
    }

    app.start();
})();
