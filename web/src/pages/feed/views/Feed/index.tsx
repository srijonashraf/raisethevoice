import { Empty } from 'antd';
import FeedSkeleton from 'components/FeedSkeleton';
import { useGetPostsQuery } from 'store/api/feed';
import { PostT } from 'types/feed';
import PostSingle from '../../../../components/PostSingle';

export default function Feed() {
  const { data, isLoading } = useGetPostsQuery('');

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col gap-3 mb-5">
          {data?.length ? (
            data.map((post: PostT) => <PostSingle key={post.id} {...post} />)
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="pt-10" />
          )}
        </div>
      ) : (
        <FeedSkeleton />
      )}
    </>
  );
}
