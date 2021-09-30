import useAxios from '../utilities/useAxios';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import CurrentWeatherBox from '../Components/CurrentWeatherBox';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { classNames } from '../utilities/utilities';

const CurrentWeather = () => {
	const [search, setSearch] = useState('');
	const [location, setLocation] = useState('Penang');
	const [environment, setEnvironment] = useState('');
	const handleEnvironment = (string) => {
		setEnvironment(string);
	};
	const searching = () => {
		// initiateSearch();
		setLocation(search);
		setSearch('');
	};
	var { result, isPending, error } = useAxios('current', location);

	return (
		<div className={classNames(`${environment}`, 'w-full min-h-screen p-3 space-y-20 dark:bg-gradient-to-bl dark:from-[#263549] dark:to-[#263549] ')}>
			{/* <div className={"w-full min-h-screen p-3 space-y-20 dark:bg-red-600 "}> */}
			<div className="flex justify-center ">
				<div className="relative flex justify-center p-3 mt-5 bg-gray-300 rounded-md shadow-xl">
					<input
						type="text"
						placeholder="Example: New York"
						className="text-center bg-transparent border-none outline-none appearance-none"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
						onKeyPress={(e) => {
							e.key === 'Enter' && searching();
						}}
					/>
					<SearchIcon className="block w-6 h-6 transition duration-500 ease-in-out hover:scale-150" onClick={searching} values={search} />
				</div>
			</div>
			{isPending && <Loading />}
			{result && <CurrentWeatherBox data={result} handleEnvironment={handleEnvironment} />}
			{error && <Error error={error} />}
		</div>
	);
};

export default CurrentWeather;
