import ProfileSidebar from '../../components/ProfileSidebar';

const TestForProfileSidebar = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <div className="flex gap-10">
        <ProfileSidebar />
        <ProfileSidebar isLoggined={true} />
      </div>
    </main>
  );
};

export { TestForProfileSidebar };
