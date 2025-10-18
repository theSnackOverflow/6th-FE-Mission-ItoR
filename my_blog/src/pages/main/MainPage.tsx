import Header from '../../components/Header';
import { PostList } from './components/PostList';

const MainPage = () => {
  return (
    <>
      <Header type="main" />
      <main className="mt-16 w-full h-full flex flex-col justify-start items-center min-w-mobile mobile:overflow-x-auto">
        <PostList />
      </main>
    </>
  );
};
export default MainPage;
