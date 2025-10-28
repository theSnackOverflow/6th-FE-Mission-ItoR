import Header from '../../components/Header';

const TestForHeader = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <div className="flex flex-col gap-10">
        <Header type="main" />
        <Header type="detail" />
        <Header type="write" />
        <Header type="file" />
      </div>
    </main>
  );
};

export { TestForHeader };
