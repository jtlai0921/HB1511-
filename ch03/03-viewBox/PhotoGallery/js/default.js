(function () {
    "use strict";

    var app = WinJS.Application;
	
    function swapImages(mql) {
    	var i, length, altSrc, currentImg;
    	var images = document.querySelectorAll('img');

    	for (i = 0, length = images.length; i < length; i++) {
    		currentImg = images[i];

    		altSrc = currentImg.getAttribute('data-alt-src');
    		currentImg.setAttribute('data-alt-src', currentImg.src);
					
    		currentImg.src = altSrc;
    	}
    }

    app.onactivated = function (eventObject) {
      WinJS.UI.processAll();
        
      //var highDef = window.msMatchMedia("(min-width: 1919px) and (min-height: 1079px)");
      //highDef.addListener(swapImages);

      //var portrait = window.msMatchMedia("(orientation: portrait)");
      //portrait.addListener(swapImages);
    };

    app.start();
})();
