import router from "./Router";
import { RouterProvider } from "react-router-dom";
import { MainProvider } from "./Contexts/MainContext";

function App() {
	return (
		<MainProvider>
			<RouterProvider router={router} />
		</MainProvider>
	);
}

export default App;
