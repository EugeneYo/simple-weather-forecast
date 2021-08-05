import { WiThermometerExterior, WiThermometer, WiTime12, WiHumidity, WiStrongWind, WiSunrise, WiSunset, WiDayCloudy } from "react-icons/wi";
import { useState, useEffect } from "react";
import { convert_Unix_UTC_to_Local, getWeatherIcon } from "../utilities/utilities";

const upperCaseFirstLetter = (string) => {
	const newString = string.split(" ");
	return newString.map((word) => word[0].toUpperCase() + word.substring(1)).join(" ");
};

const CurrentWeatherBox = ({ data, handleEnvironment }) => {
	const weather = {
		place: `${data.name} ${data.sys.country}`,
		weather_description: upperCaseFirstLetter(data.weather[0].description),
		icon: getWeatherIcon(data.weather[0].description, 100, "text-blue-500"),
		current_temp: `${data.main.temp.toFixed(1)}`,
		min_temp: `${data.main.temp_min.toFixed(1)} °C`,
		max_temp: `${data.main.temp_max.toFixed(1)} °C`,
		pressure: `${data.main.pressure} hPa`,
		humidity: `${data.main.humidity} %`,
		wind_speed: `${data.wind.speed.toFixed(1)} m/s`,
		current_time: convert_Unix_UTC_to_Local(data.dt),
		sunrise: convert_Unix_UTC_to_Local(data.sys.sunrise),
		sunset: convert_Unix_UTC_to_Local(data.sys.sunset),
	};
	const details = [
		{
			property: "Min Temp",
			data: weather.min_temp,
			icon: <WiThermometerExterior size={35} className="inline" />,
		},
		{
			property: "Max Temp",
			data: weather.max_temp,
			icon: <WiThermometer size={35} className="inline" />,
		},
		{
			property: "Pressure",
			data: weather.pressure,
			icon: <WiTime12 size={35} className="inline" />,
		},
		{
			property: "Humidity",
			data: weather.humidity,
			icon: <WiHumidity size={35} className="inline" />,
		},
		{
			property: "Wind Speed",
			data: weather.wind_speed,
			icon: <WiStrongWind size={35} className="inline" />,
		},
		{
			property: "Sunrise",
			data: weather.sunrise.time,
			icon: <WiSunrise size={35} className="inline" />,
		},
		{
			property: "Sunset",
			data: weather.sunset.time,
			icon: <WiSunset size={35} className="inline" />,
		},
	];

	useEffect(() => {
		if (data.main.feels_like >= 35) {
			handleEnvironment("bg-gradient-to-bl from-[#831062] to-[#f64d3b]");
		} else if (data.main.feels_like < 35 && data.main.feels_like >= 25) {
			handleEnvironment("bg-gradient-to-bl from-[#d65c4e] to-[#5f5f91]");
		} else if (data.main.feels_like < 25 && data.main.feels_like >= 10) {
			handleEnvironment("bg-gradient-to-bl from-[#4066a4] to-[#c5a3a6]");
		} else if (data.main.feels_like < 10) {
			handleEnvironment("bg-gradient-to-bl from-[#51a4db] to-[#73bae1]");
		}

		return () => {
			handleEnvironment("");
		};
	}, []);

	return (
		<div className="flex justify-center">
			<div className="p-5 space-y-5 bg-white shadow-2xl dark:text-gray-100 dark:bg-gray-800 rounded-2xl ">
				<div className="text-4xl text-center">
					{data.name}, {data.sys.country}
				</div>
				<div className="text-xl text-center">{weather.current_time.date}</div>
				{/* Showing the weather and temperature */}
				<div className="flex items-center justify-center p-2 font-semibold">
					<div className="flex flex-col items-center justify-center">
						{weather.icon}
						<div className="text-center">{weather.weather_description}</div>
					</div>
					<div className="relative p-3 mr-4 text-7xl">
						{weather.current_temp} <span className="absolute text-2xl"> °C</span>
					</div>
				</div>
				<div className="relative">
					<div>Details</div>
					<div className="absolute w-4/5 h-3 border-t-2 dark:border-white border-gray-600 top-1/2 left-[20%]"></div>
				</div>
				{/* Showing the details */}
				<div className="grid grid-cols-2 gap-4 ">
					{details.map((each) => (
						<div key={each.property} className="flex flex-col items-center justify-between">
							<div className="flex flex-col items-center justify-start">
								{each.icon}
								<div>{each.property}</div>
							</div>
							<div>
								<span className="text-yellow-600 dark:text-yellow-200"> {each.data}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CurrentWeatherBox;
