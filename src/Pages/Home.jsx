import axios from "axios";
import { useEffect, useContext, useReducer } from "react";
import Card from "../Components/Card";
import { MainContext } from "../Contexts/MainContext";

const initialState = {
	posts: [],
	isLoading: false,
	filteredPosts: []
};

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_START":
			return { ...state, isLoading: true };
		case "FETCH_SUCCESS":
			return { ...state, isLoading: false, posts: action.payload, filteredPosts: action.payload };
		case "FETCH_FAILURE":
			return { ...state, isLoading: false };
		case "FILTER_POSTS":
			return { ...state, filteredPosts: state.posts.filter((post) => post.title.toLowerCase().includes(action.payload.toLowerCase())) };
		default:
			return state;
	}
};

const Home = () => {
	const { searchQuery, addAlert } = useContext(MainContext);
	const [{ isLoading, filteredPosts }, dispatch] = useReducer(reducer, initialState);

	const getPosts = async () => {
		dispatch({ type: "FETCH_START" });
		try {
			const res = await axios.get("posts");
			dispatch({ type: "FETCH_SUCCESS", payload: res.data });
			if (searchQuery) {
				dispatch({ type: "FILTER_POSTS", payload: searchQuery });
			}
		} catch (err) {
			addAlert({ status: "error", title: "Error occurred" });
			dispatch({ type: "FETCH_FAILURE" });
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	useEffect(() => {
		dispatch({ type: "FILTER_POSTS", payload: searchQuery });
	}, [searchQuery]);

	return (
		<div className="container mx-auto">
			{isLoading ? (
				<div className="mt-52 flex items-center justify-center">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
				</div>
			) : filteredPosts.length > 0 ? (
				<div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-8 mb-8 mx-6 justify-center">
					{filteredPosts.map((info) => (
						<Card info={info} key={info.id} />
					))}
				</div>
			) : (
				<h1 className="text-2xl font-medium text-center">Posts Not found</h1>
			)}
		</div>
	);
};

export default Home;
