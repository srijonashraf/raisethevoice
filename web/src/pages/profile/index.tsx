import { Col, Row, Skeleton } from 'antd';
import FollowSuggestion from 'components/FollowSuggestion';
import Footer from 'components/Footer';
import { Button } from 'lib';
import { useParams } from 'react-router-dom';
import { useGetProfileQuery } from 'store/api/user';
import { getUserAvatar, getUserFullName } from 'utils';
import UserPosts from './UserPosts';
import ProfileUpdateModal from './ProfileUpdateModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function ProfilePage() {
  const [profileUpdateModalOpen, setProfileUpdateModalOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { userId } = useParams();
  const { data } = useGetProfileQuery(userId as any);

  return (
    <div>
      <Row gutter={[40, 0]}>
        <Col xs={24} md={18} className="col-span-4">
          <div className="bg-[#C6D8FF] bg-contain bg-center h-[170px] w-full"></div>
          <div className="px-4">
            <div className="relative flex items-start h-16">
              <img
                src={getUserAvatar(data)}
                alt="user"
                className="w-32 h-32 rounded-full object-cover absolute -translate-y-1/2"
              />
              {data && data?.user.id === user?.id ? (
                <Button
                  className="ml-auto rounded-full bg-transparent text-black hover:text-white border border-black py-2 mt-3"
                  onClick={() => setProfileUpdateModalOpen(true)}
                >
                  Edit profile
                </Button>
              ) : null}
            </div>
            {data ? (
              <div className="mt-4 flex flex-col gap-1.5">
                <div>
                  <h3 className="text-xl font-semibold">
                    {getUserFullName(data.user)}
                  </h3>
                  <h6 className="text-gray-600 -mt-1">@{data.user.username}</h6>
                </div>
                <p className="text-base">{data.bio}</p>
                <div className="flex gap-4">
                  <span>
                    <strong>232</strong> Following
                  </span>
                  <span>
                    <strong>584</strong> Followers
                  </span>
                </div>
              </div>
            ) : (
              <Skeleton className="pt-4 pb-3" />
            )}
            <UserPosts />
          </div>
        </Col>
        <Col xs={0} md={6} className="col-span-2">
          <div className="flex flex-col gap-5 sticky top-[88px]">
            <FollowSuggestion />
            <Footer />
          </div>
        </Col>
      </Row>
      {data ? (
        <ProfileUpdateModal
          open={profileUpdateModalOpen}
          onCancel={() => setProfileUpdateModalOpen(false)}
          profile={data}
        />
      ) : null}
    </div>
  );
}
