import { WiCloudy, WiDaySunny, WiShowers, WiRain, WiSnow, WiThunderstorm, WiCloud, WiDaySunnyOvercast } from "react-icons/wi";

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
		date: `${week}, ${day} ${month} ${year}`,
		time: `${hour}:${minute}`,
	};

	return data;
};

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

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

export { convert_Unix_UTC_to_Local, classNames, getWeatherIcon };
