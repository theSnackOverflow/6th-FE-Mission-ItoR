import Kakao from '../../../assets/icons/kakao.svg?react';

const SocialLoggIned = () => {
  return (
    <section className="px-4 py-3 w-full flex flex-col gap-3">
      <span className="px-1.5 text-sm font-light text-gray-56">
        소셜 로그인
      </span>
      <div className="px-4 py-3 w-full h-fit flex gap-2.5 bg-gray-90 rounded-sm">
        <Kakao className="black" />
        <span className="text-sm font-light text-gray-56">카카오 로그인</span>
      </div>
    </section>
  );
};
export default SocialLoggIned;
