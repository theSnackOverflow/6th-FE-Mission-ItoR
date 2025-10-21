import ProfileImage from '../../components/ProfileImage';

const TestForProfileImage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <div className="flex gap-10">
        <div className="flex flex-col gap-4">
          <ProfileImage size="lg" />
          <ProfileImage size="lg" src={''} />
          <ProfileImage size="md" />
          <ProfileImage size="sm" />
          <ProfileImage size="xs" />
        </div>
        <div className="flex flex-col gap-4">
          <ProfileImage size="lg" src={'/2ssac.svg'} />
          <ProfileImage size="lg" src={'/2ssac.svg'} />
          <ProfileImage size="md" src={'/2ssac.svg'} />
          <ProfileImage size="sm" src={'/2ssac.svg'} />
          <ProfileImage size="xs" src={'/2ssac.svg'} />
        </div>
      </div>
    </main>
  );
};

export default TestForProfileImage;
