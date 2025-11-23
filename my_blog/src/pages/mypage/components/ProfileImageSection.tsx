import axios from 'axios';
import { getPresignedUrl } from '../../../api/imageAPI';
import { updateProfilePicture } from '../../../api/userAPI';
import ProfileImage from '../../../components/ProfileImage';

interface ProfileImageSectionProps {
  profileUrl?: string;
  isEditing: boolean;
  onProfileUrlChange: (url: string) => void;
}

const ProfileImageSection = ({
  profileUrl,
  isEditing,
  onProfileUrlChange,
}: ProfileImageSectionProps) => {
  const handleUploadProfile = async (file: File) => {
    try {
      const presignedUrl = await getPresignedUrl(file.name);

      await axios.put(presignedUrl, file, {
        headers: { 'Content-Type': file.type },
      });

      const imageUrl = presignedUrl.split('?')[0];

      await updateProfilePicture(imageUrl);
      onProfileUrlChange(imageUrl);
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
    }
  };

  return (
    <div className="px-4 py-3">
      <ProfileImage
        src={profileUrl}
        isEdit={isEditing}
        onUpload={handleUploadProfile}
      />
    </div>
  );
};

export default ProfileImageSection;
