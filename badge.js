function updateBadge(data) {
	var matchObj = JSON.parse(data.target.responseText);
	var str_num = matchObj.matches.length + '';
	chrome.browserAction.setBadgeText({text:str_num});
}
function getMatchCount() {
	var req = new XMLHttpRequest();
	req.open("GET", 'http://www.ripexz.com/dota2betalert/get_json.php', true);
	req.onload = updateBadge.bind(this);
	req.send(null);
}

function addAlarm() {
	chrome.alarms.get("dota2betalert", function(alarm){
		if (typeof alarm == "undefined") {
			chrome.alarms.create("dota2betalert", {
				when: Date.now(),
				periodInMinutes: 0.1
			});
		}
	});
}
chrome.alarms.onAlarm.addListener(function(alarm) {
	if (alarm.name == "dota2betalert") {
		getMatchCount();
	}
});
chrome.runtime.onStartup.addListener(function() {
	addAlarm();
});
chrome.runtime.onInstalled.addListener(function() {
	addAlarm();
});