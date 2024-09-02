import { Col, Row } from 'antd';
import FollowSuggestion from 'components/FollowSuggestion';
import Footer from 'components/Footer';
import Feed from './views/Feed';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import TrendingPosts from 'components/TrendingPosts';

export default function FeedPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Row gutter={[40, 0]} className="pt-6">
      <Col xs={24} md={18} className="col-span-4 ">
        <Feed />
      </Col>
      <Col xs={0} md={6} className="col-span-2">
        <div className="sticky top-[88px] flex flex-col gap-5">
          {/* <TrendingTags /> */}
          {user ? <FollowSuggestion /> : <TrendingPosts />}

          <Footer />
        </div>
      </Col>
    </Row>
  );
}
