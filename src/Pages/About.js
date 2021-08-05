import { useState } from "react";

const About = () => {
	return (
		<div className="w-full min-h-screen p-3 space-y-20 md:flex md:justify-center dark:bg-[#263549] dark:text-gray-300">
			<div className="w-auto pt-2 md:w-3/5 md:flex-col md:justify-center">
				<div className="space-y-16">
					<div className="space-y-5">
						<div className="text-3xl font-semibold text-left md:text-4xl">Purpose</div>
						<div className="text-lg text-justify md:text-xl">
							The purpose of developing this simple portfolio is to understand ReactJS while using TailwindCSS as a styling tool. As well as to
							understand how the data transferred from the APIs and display it to the client side.
						</div>
					</div>
					<div className="space-y-5">
						<div className="text-3xl font-semibold text-left md:text-4xl">About</div>
						<div className="text-lg text-justify md:text-xl">
							<span className="text-indigo-400">Simple Weather Forecast</span> was built using ReactJs, TailwindCSS, and OpenWeather APIs. The APIs
							are signed up using the free plan, which means there is certain limitation on the number of request sent to get the weather data.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
