import { useState } from 'react';

import Header from '../../components/Header';
import { PostList } from '../main/components/PostList';
import ProfileSection from '../../components/ProfileSection';

import { mockData } from '../../const/mockData';

const Mypage = () => {
  const [posts] = useState(mockData);

  const myposts = posts.filter((post) => post.nickName === '2ssac');
  return (
    <>
      <Header type="main" />
      <div style={{ top: 74 }}>
        <ProfileSection showEdit={true} />
      </div>
      <main className="mt-3 w-full h-full flex flex-col justify-start items-center min-w-mobile mobile:overflow-x-auto">
        <PostList posts={myposts} />
      </main>
    </>
  );
};

export default Mypage;
