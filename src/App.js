import { Switch, Route, Link } from "react-router-dom";
import About from "./Pages/About";
import CurrentWeather from "./Pages/CurrentWeather";
import Navigation from "./Components/Navigation";
import SevenDaysWeather from "./Pages/SevenDaysWeather";
import { useState } from "react";
import { classNames } from "./utilities/utilities";

function App() {
	const [mode, setMode] = useState(true);
	const toggleMode = () => {
		setMode((prev) => !prev);
	};
	return (
		<div className={classNames(mode ? "light" : "dark", "App font-Nunito")}>
			<Navigation toggleMode={toggleMode} mode={mode} />
			<Switch>
				<Route exact path="/simple-weather-forecast" component={CurrentWeather} />
				<Route exact path="/simple-weather-forecast/sevendays" component={SevenDaysWeather} />
				<Route exact path="/simple-weather-forecast/about" component={About} />
			</Switch>
		</div>
	);
}

export default App;
