import { useState, useEffect } from "react";
import axios from "axios";

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
			setError({
				statusCode: e.response.data.cod,
				message: e.response.data.message,
			});
		}
	};

	const getSevenDaysWeather = async (location) => {
		try {
			const { data } = await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
				params: {
					q: location,
					units: "metric",
					appid: API_KEY,
				},
			});
			setResult(data);
			// setIsPending(false);
			// setError(null);
		} catch (e) {
			// setError(e);
			// setIsPending(false);
			// console.log(e);
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
	}, [location]);
	return { result, isPending, error, initiateSearch };
};

export default useAxios;
