var APIkey = "fb205474cac7d34e67dd9ee2fbe64742";

var city;

var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid="+APIkey;

fetch(requestUrl)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
	});
