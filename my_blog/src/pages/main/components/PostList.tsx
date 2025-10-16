import Blank from '../../../components/Blank';
import Pagination from '../../../components/Pagination/Pagination';
import { PostItem } from './PostItem';

const PostList = () => {
  return (
    <section className="w-[688px] h-full flex flex-col justify-between border">
      <div>
        <Blank />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <Blank variant="20" />
      </div>
      <div className="">
        <Pagination totalPages={5} initialPage={1} />
        <Blank variant="64" />
      </div>
    </section>
  );
};

export { PostList };
