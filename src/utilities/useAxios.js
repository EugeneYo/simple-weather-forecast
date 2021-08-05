import { useState, useEffect } from "react";
import axios from "axios";
import { ReplyIcon } from "@heroicons/react/solid";

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API;

const useAxios = (options, location) => {
	const [result, setResult] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	const initiateSearch = () => {
		setResult(null);
		setIsPending(true);
		setError(null);
	};
	const getCurrentWeather = async (location) => {
		try {
			const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
				params: {
					q: location,
					units: "metric",
					appid: API_KEY,
				},
			});
			setResult(data);
			console.log(data);
			setIsPending(false);
			setError(null);
		} catch (e) {
			setResult(null);
			console.log(e.response);
			setIsPending(false);

			if (e.response) {
				setError({
					statusCode: e.response.data.cod,
					message: e.response.data.message,
				});
			} else {
				setError({
					statusCode: 404,
					message: "not online",
				});
			}
		}
	};

	const getSevenDaysWeather = async (location) => {
		try {
			const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
				params: {
					q: location,
					units: "metric",
					appid: API_KEY,
				},
			});
			console.log(response.data);
			const { data } = await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
				params: {
					lat: response.data.coord.lat,
					lon: response.data.coord.lon,
					units: "metric",
					exclude: "current,minutely,hourly,alerts",
					appid: API_KEY,
				},
			});
			data["state"] = response.data.name;
			data["country"] = response.data.sys.country;
			setResult(data);
			console.log(data);
			setIsPending(false);
			setError(null);
		} catch (e) {
			setResult(null);
			console.log(e.response);
			setIsPending(false);

			if (e.response) {
				setError({
					statusCode: e.response.data.cod,
					message: e.response.data.message,
				});
			} else {
				setError({
					statusCode: 404,
					message: "not online",
				});
			}
		}
	};

	useEffect(() => {
		setTimeout(() => {
			options === "current" ? getCurrentWeather(location) : getSevenDaysWeather(location);
			// axios
			// 	.get(url, options)
			// 	.then((res) => {
			// 		setData(res?.data);
			// 		setIsPending(false);
			// 		setError(null);
			// 		console.log(res.data);
			// 	})
			// 	.catch((e) => {
			// 		if (e) setError(e);
			// 		setData(null);
			// 		setIsPending(false);
			// 	});
		}, 1500);

		console.log("Getting Request");
		return () => {
			console.log("reset");
			setResult(null);
			setIsPending(true);
			setError(null);
		};
	}, [location]);
	return { result, isPending, error };
};

export default useAxios;
