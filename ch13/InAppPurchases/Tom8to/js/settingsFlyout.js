(function () {
  var currentApp, licenseInfo, buyAlarmPack, buyFontPack;

  var alarms = [
    { name: "Arena Buzzer", value: "ArenaBuzzer" },
    { name: "Basic Alarm", value: "alarmRing", selected: "selected" },
    { name: "Boing", value: "boing" },
    { name: "Jazz Tune", value: "jazzTune" },
    { name: "Siren", value: "siren" }
  ];

  var alarmPack = [
    { name: "Shouty Dubstep", value: "dubstep" },
    { name: "Wailing Baby", value: "wailingBaby" },
    { name: "Ballmer", value: "steveB" },
    { name: "R. Lee Ermey Yelling", value: "drillSergeant" }
  ];

  var fonts = [
    { name: "Calibri", value: "calibri" },
    { name: "Cambria", value: "cambria" },
    { name: "Consolas", value: "consolas" },
    { name: "Gabriola", value: "gabriola" },
    { name: "Impact", value: "impact" },
    { name: "Palatino", value: "palatino" },
    { name: "Segoe UI", value: "segoeUI", selected: "selected" }
  ];

  function addOptions(selectList, data) {
    var optionControl;
    var optionTemplate = document.querySelector('#optionsTemplate');

    if (optionsTemplate) {
      optionControl = optionTemplate.winControl;

      data.forEach(function (item) {
        optionControl.render(item, selectList);
      });
    }
  }

  function renderAlarmData() {
    var alarmSound = document.querySelector('#alarmSound');
    
    if (licenseInfo.productLicenses.lookup("AlarmPack1").isActive) {
      alarms = alarms.concat(alarmPack);
    }

    addOptions(alarmSound, alarms);
  }

  function initStoreApi() {
    // currentApp = Windows.ApplicationModel.Store.CurrentApp;
    currentApp = Windows.ApplicationModel.Store.CurrentAppSimulator;

    licenseInfo = currentApp.licenseInformation;
  }

  function renderFontData() {
    var alarmFont = document.querySelector('#alarmFont');

    addOptions(alarmFont, fonts);
  }

  function initSettingsFlyout(element, options) {
		var alarmFont, alarmSound, reset;
		var settings = Windows.Storage.ApplicationData.current.roamingSettings;
		var container = settings.createContainer("Tom8toSettings", Windows.Storage.ApplicationDataCreateDisposition.always);

		alarmFont = document.querySelector('#alarmFont');
		alarmSound = document.querySelector('#alarmSound');
		reset = document.querySelector('#resetDefaults');

		buyAlarmPack = document.querySelector('#buyAlarmPack');
		buyFontPack = document.querySelector('#buyFontPack');

		if (container.values["alarmFont"]) { 
			alarmFont.value = container.values["alarmFont"];
		}

		if (container.values["alarmSound"]) {
			alarmSound.value = container.values["alarmSound"];
		}

		alarmFont.addEventListener('change', function () {
			container.values["alarmFont"] = alarmFont.value;

			Observer.publish('Settings.FontChange');
		});

		alarmSound.addEventListener('change', function () {
			container.values["alarmSound"] = alarmSound.value;

			Observer.publish('Settings.AlarmChange');
		});

		reset.addEventListener('click', function () {
			container.values["alarmSound"] = "alarmRing";
			container.values["alarmFont"] = "segoeUI";

			alarmFont.value = "segoeUI";
			alarmSound.value = "alarmRing";

			Observer.publish('Settings.AlarmChange');
			Observer.publish('Settings.FontChange');
		});

		initStoreApi();

		if (!licenseInfo.productLicenses.lookup("AlarmPack1").isActive) {
		  buyAlarmPack.addEventListener('click', function () {
		    currentApp.requestProductPurchaseAsync("AlarmPack1", true).done(function (receipt) {
		      buyAlarmPack.disabled = true;
		    });
		  });
		} else {
		  buyAlarmPack.disabled = true;
		}

		renderAlarmData();
		renderFontData();
	}

	WinJS.UI.Pages.define('/html/settingsFlyout.html', {
		ready: initSettingsFlyout
	});
})();