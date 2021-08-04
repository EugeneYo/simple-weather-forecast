const Error = ({ error }) => {
	return (
		<div className="flex justify-center">
			<div className="relative p-5 space-y-5 text-gray-100 bg-gray-800 rounded-2xl">
				<div className="text-xl text-start">Status Code</div>
				<div className="p-3 text-center text-red-500 text-9xl">{error.statusCode}</div>
				{/* Showing the weather and temperature
				<div className="flex items-center justify-center p-2 font-semibold">
					<div className="flex flex-col items-center justify-center">hahahaa</div>
					<div className="relative p-3 mr-4 text-7xl">LOoL</div>
				</div> */}
				<div className="relative py-3">
					<div className="absolute w-full h-3 border-t-2 border-white "></div>
					<div className="absolute p-2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 top-1/2 left-1/2">Error Message</div>
				</div>
				<div className="text-3xl text-center">{error.message}</div>
			</div>
		</div>
	);
};

export default Error;
