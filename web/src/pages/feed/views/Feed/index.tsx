import { Empty } from 'antd';
import FeedSkeleton from 'components/FeedSkeleton';
import { useGetPostsQuery } from 'store/api/feed';
import { PostT } from 'types/feed';
import PostSingle from '../../../../components/PostSingle';

export default function Feed() {
  const { data, isLoading } = useGetPostsQuery('');

  return (
    <div className="py-7">
      {!isLoading ? (
        <div className="flex flex-col gap-3">
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
