import Layout from "./Layout";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/Post",
				children: [
					{
						path: ":id",
						element: <Post />
					}
				]
			}
		]
	}
]);

export default router;
