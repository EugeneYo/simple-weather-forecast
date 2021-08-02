/* eslint-disable no-sequences */
import {
	WiCloudy,
	WiDaySunny,
	WiShowers,
	WiRain,
	WiSnow,
	WiThunderstorm,
	WiCloud,
	WiThermometerExterior,
	WiThermometer,
	WiTime12,
	WiHumidity,
	WiStrongWind,
	WiDaySunnyOvercast,
	WiSunrise,
	WiSunset,
} from "react-icons/wi";
import { useState, useEffect } from "react";
const getWeatherIcon = (description, size, className) => {
	switch (description) {
		case "clear sky":
			return <WiDaySunny size={size} className={`${className}`} />;
		case "few clouds":
		case "scattered clouds":
		case "broken clouds":
		case "overcast clouds":
			return <WiCloudy size={size} className={`${className}`} />;
		case "shower rain":
		case "light intensity drizzle":
		case "drizzle":
		case "heavy intensity drizzle":
		case "light intensity drizzle rain":
		case "drizzle rain":
		case "heavy intensity drizzle rain":
		case "shower rain and drizzle":
		case "heavy shower rain and drizzle":
		case "shower drizzle":
			return <WiShowers size={size} className={`${className}`} />;
		case "rain":
		case "light rain":
		case "moderate rain":
		case "heavy intensity rain":
		case "very heavy rain":
		case "extreme rain":
		case "freezing rain":
		case "light intensity shower rain":
		case "heavy intensity shower rain":
		case "ragged shower rain":
			return <WiRain size={size} className={`${className}`} />;
		case "thunderstorm":
		case "thunderstorm with light rain":
		case "thunderstorm with rain":
		case "thunderstorm with heavy rain":
		case "light thunderstorm":
		case "heavy thunderstorm":
		case "ragged thunderstorm":
		case "thunderstorm with light drizzle":
		case "thunderstorm with drizzle":
		case "thunderstorm with heavy drizzle":
			return <WiThunderstorm size={size} className={`${className}`} />;
		case "Snow":
		case "light snow":
		case "Heavy snow":
		case "Sleet":
		case "Light shower sleet":
		case "Shower sleet":
		case "Light rain and snow":
		case "Rain and snow":
		case "Light shower snow":
		case "Shower snow":
		case "Heavy shower snow":
			return <WiSnow size={size} className={`${className}`} />;
		case "mist":
		case "Smoke":
		case "Haze":
		case "fog":
		case "sand":
		case "dust":
		case "volcanic ash":
		case "squalls":
		case "tornado":
			return <WiCloud size={size} className={`${className}`} />;
		default:
			return <WiDaySunnyOvercast size={size} className={`${className}`} />;
	}
};

const upperCaseFirstLetter = (string) => {
	const newString = string.split(" ");
	return newString.map((word) => word[0].toUpperCase() + word.substring(1)).join(" ");
};

const convert_Unix_UTC_to_Local = (seconds) => {
	const milliseconds = seconds * 1000;
	const date = new Date(milliseconds);
	const week = date.toLocaleString("en-US", { weekday: "long" }); // Monday
	const month = date.toLocaleString("en-US", { month: "long" }); // December
	const day = date.toLocaleString("en-US", { day: "numeric" }); // 9
	const year = date.toLocaleString("en-US", { year: "numeric" }); // 2019
	const hour = date.toLocaleString("en-US", { hour12: false, hour: "2-digit" }); // 1 PM => 13
	const minute = date.toLocaleString("en-US", { minute: "numeric" }); // 30
	const second = date.toLocaleString("en-US", { second: "numeric" }); // 15
	const timezone = date.toLocaleString("en-US", { timeZoneName: "short" }); // 12/9/2019, 10:30:15 AM CST
	const string = `${day} ${month} ${year} ${hour}`;

	const data = {
		date: `${week}, ${day} ${month}, ${year}`,
		time: `${hour}:${minute}`,
	};

	return data;
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
		if (data.main.feels_like > 25) {
			handleEnvironment("bg-gradient-to-bl from-[#52a4db] to-[#73bae1]");
		}
	}, []);

	return (
		<div className="flex justify-center">
			<div className="p-5 space-y-5 text-gray-100 bg-gray-800 rounded-2xl">
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
					<div className="absolute w-4/5 h-3 border-t-2 border-white top-1/2 left-[20%]"></div>
				</div>
				{/* Showing the details */}
				<div className="grid grid-cols-2 gap-4 ">
					{details.map((each) => (
						<div className="flex flex-col items-center justify-between">
							<div className="flex flex-col items-center justify-start">
								{each.icon}
								<div>{each.property}</div>
							</div>
							<div>
								<span className="text-yellow-200"> {each.data}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CurrentWeatherBox;
