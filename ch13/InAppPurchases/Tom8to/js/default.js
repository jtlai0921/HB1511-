﻿(function () {
    "use strict";

    var timerDuration;
    var play, pause, reset, playSmall, hidden, timer, appBar, barReset, barCancel,
				pauseContainer, playContainer, alarm, changeDuration, resetDuration, ad;
    
    var app = WinJS.Application;
    var appData = Windows.Storage.ApplicationData.current;
    var container = appData.roamingSettings.createContainer("Tom8toSettings", Windows.Storage.ApplicationDataCreateDisposition.always);

    function populateDOMVariables() {
      play = document.querySelector('#play');
      pause = document.querySelector('#pause');
      pauseContainer = document.querySelector('#pauseContainer');
      playSmall = document.querySelector('#playSmall');
      playContainer = document.querySelector('#playContainer');
      reset = document.querySelector('#reset');
      ad = document.querySelector('#adsBlock');
          	
      hidden = document.querySelector('.hidden');
    	timer = document.querySelector('#timer');

    	appBar = document.getElementById('appBar');
    	barReset = document.querySelector('#barReset');
    	barCancel = document.querySelector('#barCancel');

    	changeDuration = document.querySelector('#timerDuration');
    	resetDuration = document.querySelector('#resetDuration');

    	alarm = document.querySelector('#alarm');    				
    }

    function addUIEvents() {
      play.addEventListener('click', function () {
        stopAlarm(); //if a previous alarm is still playing, pause it

        //Hide the Ad Banner
        WinJS.UI.Animation.fadeOut(ad);

        Tom8to.startCountdown();
        toggleAppBarButtons();
      });

      pause.addEventListener('click', function () {
        UIController.transition(playContainer, pauseContainer);
        Countdown.stop();
        Observer.publish('Toast.remove');
      });

      playSmall.addEventListener('click', function () {
        UIController.transition(pauseContainer, playContainer);
        Countdown.start();
      });

      reset.addEventListener('click', function () {
        stopAlarm(); //if a previous alarm is still playing, pause it

        if (pauseContainer.className === 'hidden') {
          UIController.transition(pauseContainer, playContainer);
        }

        Countdown.reset(container.values["timerDuration"]);
        Observer.publish('Toast.remove');
      });

      barReset.addEventListener('click', function () {
        appBar.winControl.hide();
        stopAlarm(); //if a previous alarm is still playing, pause it

        Countdown.reset(container.values["timerDuration"]);
        Observer.publish('Toast.remove');
      });

      barCancel.addEventListener('click', function () {
        appBar.winControl.hide();
        stopAlarm(); //if a previous alarm is still playing, pause it

        if (ad) {
          WinJS.UI.Animation.fadeIn(ad);
        }

        Tom8to.resetToStart();
      });

      changeDuration.addEventListener('change', function () {
        setTimerDuration(changeDuration.value);

        changeDuration.parentElement.winControl.hide();
      });

      resetDuration.addEventListener('click', function () {
        setTimerDuration('25');

        changeDuration.value = 25;
        resetDuration.parentElement.winControl.hide();
      });
    }
	
    function applySettings() {
    	if (!container.values["alarmSound"]) {
    		container.values["alarmSound"] = "alarmRing";
		}

    	if (!container.values["alarmFont"]) {
    		container.values["alarmFont"] = "segoeUI";
			}

    	if (!container.values["timerDuration"]) {
    		container.values["timerDuration"] = 25;
    	}

    	timerDuration = container.values["timerDuration"];
    	changeDuration.value = timerDuration;

		timer.className = container.values["alarmFont"];
    }

    function toggleAppBarButtons() {
    	var appBarButtons = document.querySelectorAll('button[data-win-control="WinJS.UI.AppBarCommand"]');

    	for (var i = 0, len = appBarButtons.length; i < len; i++) {
    		if (appBarButtons[i].getAttribute('disabled') === '') {
    			appBarButtons[i].removeAttribute('disabled');
    		} else {
    			appBarButtons[i].setAttribute('disabled', '');
    		}
    	}
    }

    function createTimerSubscriptions() {
    	Observer.subscribe('Timer.tick', function (topics, data) {
    		timer.innerText = data;
    	});

    	Observer.subscribe('Timer.init', function (topics, data) {
    		timer.innerText = data;
    	});

    	Observer.subscribe('Timer.end', function () {
    		if (alarm.src) {
    			alarm.play();
    	  }

    	  // triggers pulse animation
    		WinJS.Utilities.addClass(timer, 'pulse');
    		
    		setTimeout(function () {
					WinJS.Utilities.removeClass(timer, 'pulse');

					if (ad) {
					  WinJS.UI.Animation.fadeIn(ad);
					}

					Tom8to.resetToStart();
    		}, 10000);
    	});
    }
  
    function createSettingsSubscriptions() {
    	Observer.subscribe('Settings.AlarmChange', function () {
    		alarm.src = "audio/" + container.values["alarmSound"] + ".mp3";
    	});

    	Observer.subscribe('Settings.FontChange', function () {
    		timer.className = container.values["alarmFont"];
    	});
    }

    function setTimerDuration(duration) {
    	container.values["timerDuration"] = duration;
    	timerDuration = duration;

    	Countdown.initialize(container.values["timerDuration"]);

    	//Access the Countdown object to get the formatted time value
    	timer.innerText = Countdown.time();
    }

    function stopAlarm() {
      alarm.pause();
    }

    function initLicense() {
      //TODO: Replace before submission to store
      //var currentApp = Windows.ApplicationModel.Store.CurrentApp;
      var currentApp = Windows.ApplicationModel.Store.CurrentAppSimulator;
            
      return currentApp.licenseInformation;
    }

    // Main Application Entry Point
    app.addEventListener('activated', function (eventObject) {    	
      var licenseInfo;
      var evtDetails = eventObject.detail;
      var execStates = Windows.ApplicationModel.Activation.ApplicationExecutionState;

      if (!(evtDetails.previousExecutionState === execStates.suspended && (eventObject.detail.arguments === "toast"))) {

        licenseInfo = initLicense();

        if (licenseInfo.isTrial) {
          ad = document.querySelector('#adsBlock');
          var adControl = new MicrosoftNSJS.Advertising.AdControl(ad, {
            applicationId: "test_client",
            adUnitId: "ImageText_320x50"
          });
        }

        populateDOMVariables();
        addUIEvents();
        UIController.initButtons(document.querySelectorAll("[class^='icon-']"));

        applySettings();
        createTimerSubscriptions();
        createSettingsSubscriptions();
    	
        WinJS.UI.processAll();          	
    	
         if (evtDetails.previousExecutionState === execStates.terminated && app.sessionState["timeRemaining"]) {
          LifecycleManager.resume();
        } else {
          Countdown.initialize(timerDuration);
          timer.innerText = Countdown.time();
        }

        Observer.publish('App.loaded');
      }
    });

    app.addEventListener('settings', function (e) {
    	e.detail.applicationcommands = {
    		"helpDiv": { title: "Help", href: "/html/helpFlyout.html" },
    		"settingsDiv": { title: "Settings", href: "/html/settingsFlyout.html" }
    	};
    	WinJS.UI.SettingsFlyout.populateSettings(e);
    });

    app.start();

    WinJS.Namespace.define("Tom8to", {
      resetToStart: function() {
    	  UIController.transition(play, hidden).then(function () {
    	    UIController.transition(pauseContainer, playContainer).done(function () {
    	      Countdown.stop();
    	        Countdown.initialize(timerDuration);
    	    });
    	  });
    	  toggleAppBarButtons();
    	  Observer.publish('Toast.remove');
      },
      startCountdown: function () {
    	  UIController.transition(hidden, play);
        Countdown.start();
      }
    });
})();