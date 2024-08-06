import { Card, Skeleton } from "antd";
import { useGetFeedQuery } from "store/api/feed";
import Post from "./Post";
import { PostT } from "types/feed";

export default function Feed() {
	const { data, isLoading } = useGetFeedQuery("");

	return (
		<>
			{!isLoading ? (
				data.map((post: PostT) => <Post key={post.id} {...post} />)
			) : (
				<div className="flex flex-col gap-5">
					<Card>
						<Skeleton />
					</Card>
					<Card>
						<Skeleton />
					</Card>
					<Card>
						<Skeleton />
					</Card>
				</div>
			)}
		</>
	);
}
