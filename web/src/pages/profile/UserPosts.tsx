import { Empty } from 'antd';
import FeedSkeleton from 'components/FeedSkeleton';
import PostSingle from 'components/PostSingle';
import { useParams } from 'react-router-dom';
import { useGetPostsQuery } from 'store/api/feed';
import { PostT } from 'types/feed';

export default function UserPosts() {
  const { userId } = useParams();
  const { data, isLoading } = useGetPostsQuery({ author_id: userId });

  return (
    <div className="mt-4">
      {!isLoading ? (
        <div className="flex flex-col gap-3 mb-5">
          {data?.length ? (
            data.map((post: PostT) => <PostSingle key={post.id} post={post} />)
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="pt-10" />
          )}
        </div>
      ) : (
        <FeedSkeleton />
      )}
    </div>
  );
}
