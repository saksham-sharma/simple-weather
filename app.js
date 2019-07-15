window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let degreeSection = document.querySelector('.degree-section');
	const degreeSpan = document.querySelector('.degree-section span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
		long = position.coords.longitude;
		lat = position.coords.latitude;

		const proxy = "http://cors-anywhere.herokuapp.com/";
		const api = `${proxy}https://api.darksky.net/forecast/b5f826fc2f61339c095834ed4a63ee16/${lat},${long}`;
		
		fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				const { temperature, summary, icon } = data.currently;
				//Set DOM Elements from the API
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;

				//Formula for degree conversion
				let celcius = (temperature - 32) * (5 / 9);

				//Set Icon
				setIcons(icon, document.querySelector(".icon"));

				//Change temperature to Celcius/Farenheit
				degreeSection.addEventListener('click', () => {
					if(degreeSpan.textContent == "F") {
						degreeSpan.textContent= "C";
						temperatureDegree.textContent = strip(celcius);
					}else{
						degreeSpan.textContent = "F"
						temperatureDegree.textContent = temperature;
					}
				})
			});
		});

	}
	function setIcons(icon, iconID) {
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
	function strip(number) {
		return (parseFloat(number).toPrecision(4))
	}
});
