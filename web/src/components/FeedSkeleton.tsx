import { Card, Skeleton } from 'antd';

const FeedSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Card key={idx}>
          <Skeleton />
        </Card>
      ))}
    </div>
  );
};

export default FeedSkeleton;
