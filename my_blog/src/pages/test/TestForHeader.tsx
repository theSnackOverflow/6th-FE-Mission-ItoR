import {
  MainHeader,
  DetailHeader,
  WriteHeader,
  FileHeader,
} from '../../components/Header';

const TestForHeader = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <div className="flex flex-col gap-10">
        <MainHeader />
        <DetailHeader />
        <WriteHeader onPost={() => console.log('post clicked')} />
        <FileHeader onAddImage={() => console.log('add image clicked')} />
      </div>
    </main>
  );
};

export { TestForHeader };
