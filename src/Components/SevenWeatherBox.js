/* eslint-disable no-sequences */
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { WiThermometerExterior, WiThermometer, WiTime12, WiHumidity, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";
import { useState, useEffect } from "react";
import { convert_Unix_UTC_to_Local, getWeatherIcon } from "../utilities/utilities";

const upperCaseFirstLetter = (string) => {
	const newString = string.split(" ");
	return newString.map((word) => word[0].toUpperCase() + word.substring(1)).join(" ");
};

const SevenWeatherBox = ({ data, handleEnvironment }) => {
	useEffect(() => {
		if (data.daily[0].feels_like.day >= 35) {
			handleEnvironment("bg-gradient-to-bl from-[#831062] to-[#f64d3b]");
		} else if (data.daily[0].feels_like.day < 35 && data.daily[0].feels_like.day >= 25) {
			handleEnvironment("bg-gradient-to-bl from-[#d65c4e] to-[#5f5f91]");
		} else if (data.daily[0].feels_like.day < 25 && data.daily[0].feels_like.day >= 10) {
			handleEnvironment("bg-gradient-to-bl from-[#4066a4] to-[#c5a3a6]");
		} else if (data.daily[0].feels_like.day < 10) {
			handleEnvironment("bg-gradient-to-bl from-[#51a4db] to-[#73bae1]");
		}

		return () => {
			handleEnvironment("");
		};
	}, []);
	return (
		<div className="flex justify-center">
			<div className="p-5 space-y-5 dark:text-gray-100 rounded-2xl ">
				{/* <div className="p-5 space-y-5 bg-white shadow-2xl dark:text-gray-100 dark:bg-gray-800 rounded-2xl ">State, Country</div> */}
				<div className="p-5 space-y-5 text-4xl text-center text-white dark:text-gray-100 rounded-2xl">
					{data.state}, {data.country}
				</div>
				<div className="grid gap-4 sm:grid-cols-2">
					{data.daily.map((weather) => (
						<WeatherBox key={weather.sunrise} data={weather} />
					))}
				</div>
			</div>
		</div>
	);
};

const WeatherBox = ({ data }) => {
	const weather = {
		weather_description: upperCaseFirstLetter(data.weather[0].description),
		icon: getWeatherIcon(data.weather[0].description, 100, "text-blue-500"),
		current_temp: `${data.temp.day.toFixed(1)}`,
		min_temp: `${data.temp.min.toFixed(1)} °C`,
		max_temp: `${data.temp.max.toFixed(1)} °C`,
		pressure: `${data.pressure} hPa`,
		humidity: `${data.humidity} %`,
		wind_speed: `${data.wind_speed.toFixed(1)} m/s`,
		current_time: convert_Unix_UTC_to_Local(data.dt),
		sunrise: convert_Unix_UTC_to_Local(data.sunrise),
		sunset: convert_Unix_UTC_to_Local(data.sunset),
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

	return (
		<div className="self-start p-5 space-y-5 bg-white shadow-2xl dark:text-gray-100 dark:bg-gray-800 rounded-2xl">
			<div className="text-xl text-center">{weather.current_time.date}</div>
			<div className="flex items-center justify-center p-2 font-semibold">
				<div className="flex flex-col items-center justify-center">
					{weather.icon}
					<div className="text-center">{weather.weather_description}</div>
				</div>
				<div className="relative p-3 mr-4 text-7xl">
					{weather.current_temp}
					<span className="absolute text-2xl"> °C</span>
				</div>
			</div>

			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button className="relative flex justify-between w-full py-2 text-sm font-medium text-left text-gray-900 rounded-lg ">
							<span className="dark:text-white">Details</span>
							<div className="absolute w-3/4 h-3 border-t-2 dark:border-white border-gray-600 top-1/2 left-[18%]"></div>

							<ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-blue-500`} />
						</Disclosure.Button>
						<Disclosure.Panel className="grid grid-cols-2 gap-4 ">
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
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};

export default SevenWeatherBox;
