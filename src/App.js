import { Switch, Route, Link } from "react-router-dom";
import About from "./Pages/About";
import CurrentWeather from "./Pages/CurrentWeather";
import Navigation from "./Components/Navigation";

function App() {
	return (
		<div className="App font-Nunito">
			<Navigation />
			<Switch>
				<Route exact path="/simple-weather-forecast" component={CurrentWeather} />
				<Route exact path="/simple-weather-forecast/sevendays"></Route>
				<Route exact path="/simple-weather-forecast/about" component={About} />
			</Switch>
		</div>
	);
}

export default App;
