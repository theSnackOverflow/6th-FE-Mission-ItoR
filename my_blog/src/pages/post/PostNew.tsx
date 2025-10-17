import Blank from '../../components/Blank';
import Devider from '../../components/Devider';
import Header from '../../components/Header';

const PostNew = () => {
  const handleAutoHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <>
      <Header type="write" />
      <Header type="file" addImg={true} />

      <main className="w-full flex flex-col items-center">
        {/* 제목 */}
        <header className="w-full max-w-[688px] min-w-mobile h-fit py-2">
          <Blank variant="32" />
          <div className="w-full px-3 py-3">
            <textarea
              rows={1}
              className="w-full text-2xl font-medium text-black leading-[160%] border-none resize-none placeholder:text-base placeholder:font-medium placeholder:text-gray-56"
              onInput={handleAutoHeight}
              placeholder="제목"
            />
          </div>
          <Blank variant="32" />
        </header>
        <Devider />

        {/* 본문 */}
        <section className="w-full max-w-[688px] min-w-mobile h-fit">
          <Blank variant="20" />
          <div className="w-full h-fit px-4 py-3">
            <textarea
              className="w-full h-fit text-sm font-light text-gray-20 border-none resize-none overflow-hidden placeholder:text-gray-56"
              placeholder="어떤 것을 깨달았나요?"
              onInput={handleAutoHeight}
            />
          </div>
          <Blank variant="20" />
        </section>
      </main>
    </>
  );
};

export default PostNew;
