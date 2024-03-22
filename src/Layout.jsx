import { useState, useContext, useEffect } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { MainContext } from "./Contexts/MainContext";

const Layout = () => {
	const { alert, addAlert } = useContext(MainContext);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		let timer;

		if (alert?.title) {
			setShowAlert(true);
			timer = setTimeout(() => {
				addAlert(null);
				setShowAlert(false);
			}, 2000);
		}

		return () => clearTimeout(timer);
	}, [alert, addAlert]);

	return (
		<>
			<div className={`fixed top-5 z-30 right-0 mr-6 px-6 py-4 rounded-lg shadow-lg text-white transition-all duration-300 ${showAlert ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} ${alert?.status === "error" ? "bg-red-500" : alert?.status === "success" ? "bg-green-500" : "bg-gray-500"}`}>
				<div className="flex items-center justify-between gap-1">
					<span className="capitalize">{alert?.title}</span>
					<button
						className="text-white hover:text-gray-200 focus:outline-none"
						onClick={() => {
							addAlert(null);
							setShowAlert(false);
						}}>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
			<Header />
			<div className="container mx-auto mt-32">
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
