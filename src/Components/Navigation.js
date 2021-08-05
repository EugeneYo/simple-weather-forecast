import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { classNames } from "../utilities/utilities";
const navigation = [
	{ name: "Current Weather", href: "/simple-weather-forecast", current: true },
	{ name: "Seven Days Weather", href: "/simple-weather-forecast/sevenDays", current: false },
	{ name: "About", href: "/simple-weather-forecast/about", current: false },
];
const Navigation = ({ toggleMode, mode }) => {
	const [currentPath, setCurrentPath] = useState("Current Weather");

	const selected = (name, currentPath) => {
		return name === currentPath;
	};
	const updateCurrentPath = (event) => {
		navigation.map((item) => {
			if (item.href === event.target.pathname) {
				setCurrentPath(item.name);
			}
		});
	};

	return (
		<Disclosure as="nav" className="shadow-xl dark:bg-gray-800">
			{({ open }) => (
				<>
					<div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="pl-3 font-semibold text-gray-500 dark:text-white">Simple Weather Forecast</div>
							<div className="px-5">
								{mode ? (
									<div className="flex items-center justify-center space-x-3">
										<BsToggleOff
											size={35}
											className="text-blue-500 transition duration-100 ease-in transform active:scale-110"
											onClick={() => toggleMode()}
										/>
										<div className="text-gray-500 ">Light</div>
									</div>
								) : (
									<div className="flex items-center justify-center space-x-3">
										<BsToggleOn
											size={35}
											className="text-blue-500 transition duration-100 ease-in transform active:scale-110"
											onClick={() => toggleMode()}
										/>
										<div className="text-white">Dark</div>
									</div>
								)}
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? <XIcon className="block w-6 h-6" aria-hidden="true" /> : <MenuIcon className="block w-6 h-6" aria-hidden="true" />}
								</Disclosure.Button>
							</div>
							<div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-end">
								<div className="hidden sm:block sm:ml-6">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.href}
												className={classNames(
													selected(item.name, currentPath)
														? "dark:bg-gray-900 text-white bg-gray-800 "
														: "dark:text-gray-300 hover:bg-gray-700 hover:text-white",
													"px-3 py-2 rounded-md text-sm font-semibold"
												)}
												onClick={updateCurrentPath}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className={classNames(
										selected(item.name, currentPath)
											? "dark:bg-gray-900 text-white bg-gray-800"
											: "dark:text-gray-300 hover:bg-gray-700 hover:text-white",
										"block px-3 py-2 rounded-md text-base font-medium text-center"
									)}
									onClick={updateCurrentPath}
								>
									{item.name}
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Navigation;
