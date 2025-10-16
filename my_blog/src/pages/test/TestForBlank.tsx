import Blank from '../../components/Blank';

const TestForBlank = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <Blank variant="20" />
      <Blank variant="32" />
      <Blank variant="64" />
    </main>
  );
};

export { TestForBlank };
