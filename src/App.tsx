/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "components/Navbar";
import AppLayout from "layouts/AppLayout";
import FeedPage from "pages/feed";
import PostPage from "pages/post";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLoadUserQuery } from "store/api/auth";

export default function App() {
	const { data } = useLoadUserQuery("");

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/" element={<FeedPage />} />
					<Route path="post/:id" element={<PostPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
