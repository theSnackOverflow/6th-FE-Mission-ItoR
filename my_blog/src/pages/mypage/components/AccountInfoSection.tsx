import Input from '../../../components/Input/Input';
import Blank from '../../../components/Blank';
import SocialLoggIned from './SocailLoggIned';

interface AccountInfoSectionProps {
  email: string;
  password: string;
  passwordConfirm: string;
  passwordError: string;
  passwordConfirmError: string;
  name: string;
  birthdate: string;
  isEditing: boolean;
  isSocialLogin: boolean;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
  onBirthdateChange: (value: string) => void;
}

const AccountInfoSection = ({
  email,
  password,
  passwordConfirm,
  passwordError,
  passwordConfirmError,
  name,
  birthdate,
  isEditing,
  isSocialLogin,
  onPasswordChange,
  onPasswordConfirmChange,
  onBirthdateChange,
}: AccountInfoSectionProps) => {
  return (
    <section className="mb-12 flex justify-center">
      <section className="w-full max-w-[688px] min-w-mobile h-full flex flex-col">
        <Blank variant="20" />
        {isSocialLogin && <SocialLoggIned />}
        <Input
          variant="email"
          type="email"
          label="이메일"
          value={email}
          isDisabled={true}
          placeholder={email}
          unChangeable={true}
        />
        {!isSocialLogin && (
          <div>
            <Input
              variant="password"
              type="password"
              label="비밀번호"
              value={password}
              onChange={onPasswordChange}
              placeholder="........"
              isDisabled={!isEditing}
            />
            {password && passwordError && (
              <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                {passwordError}
              </p>
            )}

            <Input
              variant="passwordconfirm"
              type="password"
              label="비밀번호 확인"
              value={passwordConfirm}
              onChange={onPasswordConfirmChange}
              placeholder="........"
              isDisabled={!isEditing}
            />
            {passwordConfirm && passwordConfirmError && (
              <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                {passwordConfirmError}
              </p>
            )}
          </div>
        )}
        <Input
          variant="name"
          type="text"
          label="이름"
          value={name}
          isDisabled={true}
          placeholder={name}
          unChangeable={true}
        />
        <Input
          variant="birthdate"
          type="text"
          label="생년월일"
          value={birthdate}
          onChange={onBirthdateChange}
          placeholder={birthdate}
          isDisabled={!isEditing}
        />
        <Blank variant="32" />
      </section>
    </section>
  );
};

export default AccountInfoSection;
