import axios from "axios";
import { useRef, useState } from "react";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Contexts/MainContext";

const Post = () => {
	const { addAlert } = useContext(MainContext);

	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState({ title: "", body: "" });
	const [modalShow, setModalShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getPost = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(`posts/${id}`);
			setPost(res.data);
		} catch (err) {
			addAlert({ status: "error", title: `error occured` });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (parseInt(id)) {
			getPost();
		} else {
			setPost({
				title: "",
				body: ""
			});
		}
	}, [id]);

	const Update = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		try {
			await axios.post("posts", post);
			addAlert({ status: "success", title: `post ${post.id ? "updated" : "created"}` });
		} catch (err) {
			addAlert({ status: "error", title: "error occurred" });
		} finally {
			setIsLoading(false);
			navigate("/");
		}
	};

	const Delete = async () => {
		setIsLoading(true);
		try {
			await axios.delete(`posts/${id}`);
			addAlert({ status: "success", title: "post deleted" });
		} catch (err) {
			addAlert({ status: "error", title: "error occurred" });
		} finally {
			setIsLoading(false);
			navigate("/");
		}
	};

	// Modal close on click outside
	const deleteModal = useRef();

	const handleOutsideClick = (event) => {
		if (deleteModal.current && !deleteModal.current.contains(event.target)) {
			setModalShow(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="mt-52 flex items-center justify-center">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
				</div>
			) : (
				<>
					<div ref={deleteModal} className="relative flex left-0 top-0 justify-center drop-shadow-2xl">
						<div className={`${modalShow == true ? "visible" : "hidden"} fixed z-50`}>
							<div className="bg-white rounded-lg shadow dark:bg-gray-700">
								<button onClick={() => setModalShow(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
									<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
										<path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
								<div className="p-4 md:p-5 text-center">
									<svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
									<button onClick={() => Delete()} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
										Yes, I'm sure
									</button>
									<button onClick={() => setModalShow(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
										No, cancel
									</button>
								</div>
							</div>
						</div>
					</div>
					<form onSubmit={Update} className="w-2/3 mx-auto">
						<div className="mb-6">
							<label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Title
							</label>
							<input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} id="title" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
						</div>
						<div className="mb-6">
							<label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Body
							</label>
							<textarea id="body" value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })} className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows="5" required></textarea>
						</div>
						<div className="flex justify-between">
							<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
								{post.id ? "Update" : "Create"}
							</button>
							{post.id && (
								<button type="button" onClick={() => setModalShow(true)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
									Delete
								</button>
							)}
						</div>
					</form>
				</>
			)}
		</>
	);
};

export default Post;
