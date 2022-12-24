(function ($) {

	let APIkey = "fb205474cac7d34e67dd9ee2fbe64742";

	let cityName = $("#city-info .card-title");

	let cityTemp = $("#city-info #temperature");

	let cityHumidity = $("#city-info #humidity");

	let cityWind = $("#city-info #wind-speed");

	let cityUV = $("#city-info #uv-index");

	let fiveDaysDiv = $('#forecast');

	let cityInput = $("#city-input").val();

	console.log(cityInput)

	let searchButton = $("#search-city")


	searchButton.click(function () {
		let cityInput = $("#city-input").val();
		let cityArray = [window.localStorage.getItem("getCity")] || []
		console.log(cityArray)
		let cityData = geoLocator(cityInput)
		// let getCity = 
		//cityArray.push({cityInput, cityData})
		cityArray.push(cityInput)
		console.log(cityArray)
		// console.log(getCity)

		localStorage.setItem("getCity", cityArray)
		$("#city-list").each(function () {
			// cityArray.push({ cityInput, cityData })
			if (cityInput) {

				var cityButton = document.createElement("button")
				cityButton.textContent = cityInput
				cityButton.addEventListener("click", function () {
					console.log("clicked")
					geoLocator(cityInput)
				})
				$("#city-list").append(cityButton)
			}
		})
	})

	function geoLocator(city) {
		//const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`;
		const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`;
		console.log(requestUrl)
		fetch(requestUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				console.log(data[0]);
				getWeather(data[0].lat, data[0].lon)
				getFiveDays(city)
			});
	}

	function getWeather(lat, lon) {
		console.log(lat, lon)
		const requestUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${APIkey}`;

		fetch(requestUrl)
			.then(function (response) {
				console.log(response)
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				cityName.text(data.name)
				cityTemp.text(data.main.temp + " " + "° F")
				cityHumidity.text(data.main.humidity + " " + "Humidity")
				cityWind.text(data.wind.speed + " " + "MPH")
				getUvIndex(data.coord.lat, data.coord.lon);
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
				cityUV.text(data.value + " " + "UV Index")
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
				fiveDaysDiv.empty()
				let iconDiv = $("#weather-icon")
				let dataRow = $('<div>');
				let title = $('<h3>').addClass('text-light text-center');
				dataRow.addClass('row my-3 justify-content-between');
				for (let i = 0; i < data.list.length; i++) {
					let dataCol = $('<div>');
					dataCol.addClass(
						'col-md-2 five-days mx-2 rounded five-days-text p-3 text-center border'
					);
					iconDiv.html(`<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">`)
					console.log(iconDiv)
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



})(jQuery)