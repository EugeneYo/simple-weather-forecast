import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};
const navigation = [
	{ name: "Current Weather", href: "/simple-weather-forecast", current: true },
	{ name: "About", href: "/simple-weather-forecast/about", current: false },
];
const Navigation = () => {
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
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="pl-3 text-white">Simple Weather Forecast</div>
							<div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
													selected(item.name, currentPath) ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
													"px-3 py-2 rounded-md text-sm font-medium"
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
										selected(item.name, currentPath) ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
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
