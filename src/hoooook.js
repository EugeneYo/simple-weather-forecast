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
		date: { day, month, year },
		time: { hour, minute, second },
	};

	return data;
};
app.get("/api", async (req, res) => {
	if (!req.query.q) {
		res.json({
			Error: "Input are empty",
		});
	}

	var { data } = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
		params: {
			q: req.query.q,
			limit: 1,
			appid: process.env.OPEN_WEATHER_API_KEY,
		},
	});
	var { data } = await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
		params: {
			lat: data[0].lat,
			lon: data[0].lon,
			exclude: "minutely,hourly,alerts",
			units: "metric",
			appid: process.env.OPEN_WEATHER_API_KEY,
		},
	});
	const timestamp = convert_Unix_UTC_to_Local(data.current.dt);
	console.log(timestamp);
	res.json(data);
});

// const wait = () => {
// 	console.log("What is this?");
// };
// setInterval(wait, 1500);

app.listen(3000, () => {
	console.log("Server is up on Port 3000");
});
