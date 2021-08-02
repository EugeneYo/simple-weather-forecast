import useAxios from "../Hooks/useAxios";
import { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import CurrentWeatherBox from "../Components/CurrentWeatherBox";
import Loading from "../Components/Loading";

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

const CurrentWeather = () => {
	const [search, setSearch] = useState("");
	const [option, setOption] = useState({
		params: {
			q: "Penang",
			units: "metric",
			appid: process.env.REACT_APP_OPEN_WEATHER_API,
		},
	});
	const [environment, setEnvironment] = useState("");
	const handleEnvironment = (string) => {
		setEnvironment(string);
	};
	const trigger = (event) => {
		if (event.key === "Enter") {
			setOption({ params: { q: search, units: "metric", appid: process.env.REACT_APP_OPEN_WEATHER_API } });
		}
	};
	var { data, isPending, error } = useAxios("https://api.openweathermap.org/data/2.5/weather", option);

	return (
		<div className={classNames(`${environment}`, "w-full min-h-screen p-3 space-y-20 ")}>
			<div className="flex justify-center ">
				<div className="relative flex justify-center p-3 bg-gray-300 rounded-md shadow-xl md:w-1/5 ">
					<input
						type="text"
						placeholder="Search..."
						className="text-center bg-transparent border-none outline-none appearance-none"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
						onKeyPress={trigger}
					/>
					<SearchIcon
						className="block w-6 h-6 transition duration-500 ease-in-out hover:scale-150"
						onClick={(e) => setOption({ params: { q: search, units: "metric", appid: process.env.REACT_APP_OPEN_WEATHER_API } })}
						values={search}
					/>
				</div>
			</div>

			{error && <div> {error.message} </div>}
			{isPending && <Loading />}
			{data && <CurrentWeatherBox data={data} handleEnvironment={handleEnvironment} />}
		</div>
	);
};

export default CurrentWeather;
