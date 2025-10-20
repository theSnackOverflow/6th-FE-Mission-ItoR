import Blank from '../../../components/Blank';
import ProfileImage from '../../../components/ProfileImage';
import Input from './Input';

// interface ProfileSectionProps {
//   isLoggedIn?: boolean;
//   nickname?: string;
//   intro?: string;
//   showEdit?: boolean;
// }

// ! 프로필 부분 PropfileSidebar 컴포넌트와 중복 코드 -> 추후 별도의 컴포넌트로 분리 예정

const ProfileEditSection = () => {
  return (
    <section className="mt-18 w-full h-fit flex justify-center bg-gray-96">
      <section className="w-full max-w-[688px] min-w-mobile h-full flex flex-col">
        <div className="max-[500px]:hidden">{<Blank variant="64" />}</div>
        <div className="hidden max-[500px]:block">{<Blank variant="32" />}</div>
        {/* 프로필 */}
        <div className="px-4 py-3">
          <ProfileImage />
        </div>
        <div className="px-4 py-3 flex flex-col gap-3">
          <Input variant="nickname" type="text" />
          <Input variant="des" type="text" />
        </div>
        <Blank variant="20" />
      </section>
    </section>
  );
};

export default ProfileEditSection;
