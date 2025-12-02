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
    let previewUrl: string | null = null;
    try {
      // show immediate preview using blob URL
      previewUrl = URL.createObjectURL(file);
      onProfileUrlChange(previewUrl);

      // Upload original file (no compression)
      const presignedUrl = await getPresignedUrl(file.name);
      console.debug('[ProfileImage] presignedUrl:', presignedUrl);

      try {
        // notify upload started
        try {
          window.dispatchEvent(
            new CustomEvent('profile-upload-start', {
              detail: { fileName: file.name },
            }),
          );
        } catch {
          /* ignore */
        }
      } catch {
        /* ignore */
      }

      const putResponse = await axios.put(presignedUrl, file, {
        headers: { 'Content-Type': file.type },
      });
      console.debug(
        '[ProfileImage] S3 upload response status:',
        putResponse.status,
      );

      const imageUrl = presignedUrl.split('?')[0];
      try {
        const updateResp = await updateProfilePicture(imageUrl);
        console.debug(
          '[ProfileImage] updateProfilePicture response:',
          updateResp,
        );
        try {
          window.dispatchEvent(
            new CustomEvent('profile-uploaded', { detail: { imageUrl } }),
          );
        } catch {
          // ignore
        }
      } catch (updateErr) {
        console.error('[ProfileImage] updateProfilePicture failed:', updateErr);
        try {
          window.dispatchEvent(
            new CustomEvent('profile-upload-failed', {
              detail: { error: updateErr },
            }),
          );
        } catch {
          // ignore
        }
        throw updateErr;
      }

      // replace preview with final uploaded image url
      onProfileUrlChange(imageUrl);
      try {
        // notify AuthContext to refresh user info so global UI updates
        window.dispatchEvent(new Event('refresh-user'));
      } catch (err) {
        void err;
      }

      // revoke the blob URL created for preview to avoid memory leak
      try {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      } catch (err) {
        void err;
      }
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      // If preview was set but upload failed, revoke the blob URL to free memory
      // and optionally clear preview by notifying parent (could keep existing image)
      try {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      } catch (err) {
        void err;
      }
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
