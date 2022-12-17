(function ($) {

	let APIkey = "fb205474cac7d34e67dd9ee2fbe64742";

	let cityName = $("#city-info .card-title");

	let cityTemp = $("#city-info #temperature");

	let cityHumidity = $("#city-info #humidity");

	let cityWind = $("#city-info #wind-speed");

	let cityUV = $("#city-info #uv-index");

	let fiveDaysDiv = $('#forecast');

	let cityInput = $("#city-input").val();

	let searchButton = $("#search-city")
	

	function getWeather() {
		const requestUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=44.34&lon=10.99&appid=" + APIkey;

		fetch(requestUrl)
			.then(function (response) {
				console.log(response)
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				cityName.text(data.name)
				cityTemp.text(data.main.temp)
				cityHumidity.text(data.main.humidity)
				cityWind.text(data.wind.speed)
				getUvIndex(data.coord.lat, data.coord.lon);
				getFiveDays("Chicago")
			});
	}


	function getUvIndex(lat, lon) {

		const requestUrl = `http://api.openweathermap.org/data/2.5/uvi?&lat=${lat}&lon=${lon}&appid=${APIkey}`

		fetch(requestUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				cityUV.text(data.value)
			});


	}

	function getFiveDays(city) {

		const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&lat=44.34&lon=10.99&appid=${APIkey}`

		fetch(requestUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				let dataRow = $('<div>');
				let title = $('<h3>').addClass('text-light text-center');
				dataRow.addClass('row my-3 justify-content-between');

				for (let i = 0; i < data.list.length; i++) {
					let dataCol = $('<div>');
					dataCol.addClass(
						'col-md-2 five-days mx-2 rounded five-days-text p-3 text-center border'
					);
					let icon = `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">`;
					if (data.list[i].dt_txt.includes('18:00:00')) {
						let date = data.list[i].dt_txt;
						dataCol.html(`
					<h6>${moment(date).format('ddd, MMM Do')}</h6>
					<div class="m-0">${icon}</div>
					<ul class="list-unstyled m-0">
					<li>Temp: <b>${data.list[i].main.temp} °F</b></li>
          			<li>Humidity:<b> ${data.list[i].main.humidity} %</b></li>
					</ul>`);

						console.log(data.list[i]);
						dataRow.append(dataCol)
					}

				}
				fiveDaysDiv.append(title)
				fiveDaysDiv.append(dataRow)
			});
	}

	searchButton.click(getWeather())

	
})(jQuery)