import { Skeleton } from "antd";
import { FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const trendingPosts: any = [];

export default function RightSidebar() {
	return (
		<div>
			<div>
				<div className="flex items-center">
					<h1 className="text-xl font-bold">Trending</h1>
					<FiTrendingUp className="w-6 h-6 ml-2 -translate-y-1" />
				</div>
				{trendingPosts ? (
					trendingPosts.map((article: any) => (
						<Link to={`/article/${article.id}/`} key={article.title}>
							<p className="text-md font-semibold">{article.title}</p>
						</Link>
					))
				) : (
					<Skeleton />
				)}
			</div>
		</div>
	);
}
