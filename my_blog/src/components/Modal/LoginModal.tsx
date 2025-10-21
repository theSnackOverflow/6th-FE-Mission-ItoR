import LoginButton from '../Button/LoginButton';

const LoginModal = () => {
  return (
    <section className="relative w-[782px] h-[469px] py-20 flex justify-between items-center  bg-gray-7 rounded-[9px] ">
      <div className="w-96 h-fit flex flex-col justify-center items-center">
        <div className="h-40 flex items-center">
          <p className="text-[90px] text-white font-bold font-smooch">GITLOG</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-sm font-light text-gray-56">
            You can make anything by writing
          </p>
        </div>
      </div>
      <div className="flex-1 px-4 pt-8">
        <LoginButton type="EMALLOGIN" text="이메일로 로그인" />
        <div className="w-full flex justify-center items-center">
          <div className="w-[123px] border border-gray-20"></div>
          <span className="px-2 pt-0.5 pb-1 text-xs text-gray-56 font-normal">
            SNS
          </span>
          <div className="w-[123px] h-0 border border-gray-20"></div>
        </div>
        <LoginButton type="KAKOLOGIN" text="카카오로 로그인" />
      </div>
    </section>
  );
};

export default LoginModal;
