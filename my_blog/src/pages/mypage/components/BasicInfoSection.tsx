import Input from '../../../components/Input/Input';

interface BasicInfoSectionProps {
  nickname: string;
  introduction: string;
  isEditing: boolean;
  onNicknameChange: (value: string) => void;
  onIntroductionChange: (value: string) => void;
}

const BasicInfoSection = ({
  nickname,
  introduction,
  isEditing,
  onNicknameChange,
  onIntroductionChange,
}: BasicInfoSectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Input
        variant="nickname"
        type="text"
        value={nickname}
        onChange={onNicknameChange}
        placeholder={nickname}
        isDisabled={!isEditing}
      />
      <Input
        variant="des"
        type="text"
        value={introduction}
        onChange={onIntroductionChange}
        placeholder="자기소개를 입력하세요"
        isDisabled={!isEditing}
      />
    </div>
  );
};

export default BasicInfoSection;
