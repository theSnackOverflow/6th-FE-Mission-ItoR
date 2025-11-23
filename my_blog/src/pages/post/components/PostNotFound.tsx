import { useNavigate } from 'react-router-dom';

const PostNotFound = () => {
  const navigate = useNavigate();

  return (
    <article className="w-full h-fit flex justify-center py-10">
      <button
        className="mt-20 font-roboto flex flex-col items-center gap-5 text-gray-56"
        onClick={() => navigate('/')}
      >
        <p className="text-4xl">404 ERROR</p>
        <p className="text-6xl">Not Found!</p>
      </button>
    </article>
  );
};

export default PostNotFound;
