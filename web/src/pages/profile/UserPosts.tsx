import { Empty } from 'antd';
import FeedSkeleton from 'components/FeedSkeleton';
import PostSingle from 'components/PostSingle';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store';
import { useGetPostsQuery } from 'store/api/feed';
import { PostT } from 'types/feed';

export default function UserPosts() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { userId } = useParams();
  const { data, isLoading } = useGetPostsQuery({
    author_id: userId ?? user?.id,
  });

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
