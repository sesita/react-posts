import { useContext } from 'react';
import { MainContext } from '../Contexts/MainContext';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
	const { setSearch } = useContext(MainContext);

	const navigate = useNavigate();

	const searchSubmit = (e) => {
		e.preventDefault();
		navigate("/");
	};

	return (
		<nav className="bg-white dark:bg-gray-900 w-full fixed z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 mb-12">
			<div className="max-w-screen-xl flex items-center justify-between mx-auto p-6 gap-4">
				<Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<span className="self-center sm:text-2xl font-semibold whitespace-nowrap dark:text-white">Posts App</span>
				</Link>

				<form onSubmit={searchSubmit} className="mx-auto md:w-1/2">
					<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
								<path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
							</svg>
						</div>
						<input type="search" onChange={(e) => setSearch(e.target.value)} className="block w-full sm:p-4 p-3 sm:ps-10 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Posts..." />
					</div>
				</form>

				<Link to="/Post/Create" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg sm:text-sm sm:px-6 px-2 py-3 text-xs text-center">
					Add Post
				</Link>
			</div>
		</nav>
	);
};

export default Header;
