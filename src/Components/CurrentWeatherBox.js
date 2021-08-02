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
} from "react-icons/wi";

const getWeatherIcon = (description, size, className) => {
	switch (description) {
		case "clear sky":
			return <WiDaySunny size={size} className={`${className}`} />;
		case "few clouds":
			return <WiCloudy size={size} className={`${className}`} />;
		case "scattered clouds":
			return <WiCloudy size={size} className={`${className}`} />;
		case "broken clouds":
			return <WiCloudy size={size} className={`${className}`} />;
		case "shower rain":
			return <WiShowers size={size} className={`${className}`} />;
		case "rain":
			return <WiRain size={size} className={`${className}`} />;
		case "thunderstorm":
			return <WiThunderstorm size={size} className={`${className}`} />;
		case "snow":
			return <WiSnow size={size} className={`${className}`} />;
		case "mist":
			return <WiCloud size={size} className={`${className}`} />;
		default:
			break;
	}
};
const CurrentWeatherBox = ({ data }) => {
	return (
		<div className="flex justify-center">
			<div className="p-5 space-y-5 text-gray-100 bg-gray-800 rounded-2xl">
				<div className="text-4xl text-center">
					{data.name} {data.sys.country}
				</div>
				{/* Showing the weather and temperature */}
				<div className="flex items-center justify-center p-2 font-semibold">
					<div className="flex flex-col items-center justify-center">
						{getWeatherIcon(data.weather[0].description, 100, "text-blue-500")}
						<div className="text-center">{data.weather[0].description}</div>
					</div>
					<div className="relative p-3 mr-4 text-7xl">
						{data.main.temp.toFixed(1)} <span className="absolute text-2xl"> °C</span>
					</div>
				</div>
				{/* Showing the other details */}
				<div className="grid grid-cols-1 gap-4">
					{/* Grid Number 1 */}
					<div className="flex items-center justify-around">
						<div className="flex items-center justify-start">
							<WiThermometerExterior size={35} className="inline" />
							<div>Min Temp</div>
						</div>
						<div>
							<span className="text-yellow-200"> {data.main.temp_min.toFixed(1)} °C</span>
						</div>
					</div>
					{/* Grid Number 2 */}
					<div className="flex items-center justify-around">
						<div className="flex items-center justify-start">
							<WiThermometer size={35} className="inline" />
							<div> Max Temp</div>
						</div>
						<div>
							<span className="text-yellow-200"> {data.main.temp_max.toFixed(1)} °C</span>
						</div>
					</div>
					{/* Grid Number 3 */}
					<div className="flex items-center justify-around">
						<div className="flex items-center justify-start">
							<WiTime12 size={30} className="inline" />
							<div>Pressure</div>
						</div>
						<div>
							<span className="text-yellow-200"> {data.main.pressure} hPa</span>
						</div>
					</div>
					{/* Grid Number 4 */}
					<div className="flex items-center justify-around">
						<div className="flex items-center justify-start">
							<WiHumidity size={30} className="inline" />
							<div>Humidity</div>
						</div>
						<div>
							<span className="text-yellow-200"> {data.main.humidity} %</span>
						</div>
					</div>
					{/* Grid Number 5 */}
					<div className="flex items-center justify-around">
						<div className="flex items-center justify-start">
							<WiStrongWind size={30} className="inline" />
							<div>Wind Speed</div>
						</div>
						<div>
							<span className="text-yellow-200"> {data.wind.speed.toFixed(1)} m/s</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeatherBox;
