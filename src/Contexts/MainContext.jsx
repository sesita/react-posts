import React, { createContext, useState } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
	const [alert, setAlert] = useState({});
	const [searchQuery, setSearchQuery] = useState("");

	const setSearch = (query) => {
		setSearchQuery(query);
	};

	const addAlert = (alertData) => {
		setAlert(alertData);
	};

	return (
		<MainContext.Provider
			value={{
				searchQuery,
				setSearch,
				alert,
				addAlert
			}}>
			{children}
		</MainContext.Provider>
	);
};
