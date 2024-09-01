import { Empty } from 'antd';
import FeedSkeleton from 'components/FeedSkeleton';
import PostSingle from 'components/PostSingle';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLazyGetPostsQuery } from 'store/api/feed';
import { PostT } from 'types/feed';

export default function SearchPage() {
  const [handleSearch, { data, isLoading }] = useLazyGetPostsQuery();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      handleSearch({ q: query });
    }
  }, [searchParams]);

  return (
    <div>
      {/* <Tabs /> */}

      <div>
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
      </div>
    </div>
  );
}
