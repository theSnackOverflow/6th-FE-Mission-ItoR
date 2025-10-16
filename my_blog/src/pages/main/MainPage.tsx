import Header from '../../components/Header';
import { PostList } from './components/PostList';

const MainPage = () => {
  return (
    <>
      <Header type="main" />
      <main className="w-full h-[calc(100dvh-72px)] flex flex-col justify-start items-center bg-gray-20">
        <PostList />
      </main>
    </>
  );
};
export default MainPage;
