import Navbar from "components/Navbar";
import AppLayout from "layouts/AppLayout";
import HomePage from "pages/home";
import PostPage from "pages/post";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "store";

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route element={<AppLayout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="post/:id" element={<PostPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}
