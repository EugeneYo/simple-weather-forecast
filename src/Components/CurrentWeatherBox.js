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
} from "react-icons/wi";

const getWeatherIcon = (description, size, className) => {
	switch (description) {
		case "clear sky":
			return <WiDaySunny size={size} className={`${className}`} />;
		case ("few clouds", "scattered clouds", "broken clouds", "overcast clouds"):
			return <WiCloudy size={size} className={`${className}`} />;
		case ("shower rain",
		"light intensity drizzle",
		"drizzle",
		"heavy intensity drizzle",
		"light intensity drizzle rain",
		"drizzle rain",
		"heavy intensity drizzle rain",
		"shower rain and drizzle",
		"heavy shower rain and drizzle",
		"shower drizzle"):
			return <WiShowers size={size} className={`${className}`} />;
		case ("rain",
		"light rain",
		"moderate rain",
		"heavy intensity rain",
		"very heavy rain",
		"extreme rain",
		"freezing rain",
		"light intensity shower rain",
		"heavy intensity shower rain",
		"ragged shower rain"):
			return <WiRain size={size} className={`${className}`} />;
		case ("thunderstorm",
		"thunderstorm with light rain",
		"thunderstorm with rain",
		"thunderstorm with heavy rain",
		"light thunderstorm",
		"heavy thunderstorm",
		"ragged thunderstorm",
		"thunderstorm with light drizzle",
		"thunderstorm with drizzle",
		"thunderstorm with heavy drizzle"):
			return <WiThunderstorm size={size} className={`${className}`} />;
		case ("Snow",
		"light snow",
		"Heavy snow",
		"Sleet",
		"Light shower sleet",
		"Shower sleet",
		"Light rain and snow",
		"Rain and snow",
		"Light shower snow",
		"Shower snow",
		"Heavy shower snow"):
			return <WiSnow size={size} className={`${className}`} />;
		case ("mist", "Smoke", "Haze", "fog", "sand", "dust", "volcanic ash", "squalls", "tornado"):
			return <WiCloud size={size} className={`${className}`} />;
		default:
			return <WiDaySunnyOvercast size={size} className={`${className}`} />;
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
