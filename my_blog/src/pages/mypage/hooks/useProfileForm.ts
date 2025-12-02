import { useState, useEffect } from 'react';
import { getMyInfo } from '../../../api/userAPI';
import {
  validatePassword,
  validatePasswordConfirm,
} from '../../../utils/validation';

export const useProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string>('');

  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMyInfo();
        setNickname(user.nickname || '');
        setBirthdate(user.birthDate || '');
        setProfileUrl(user.profilePicture || '');
        setEmail(user.email || '');
        setName(user.name || '');
        setIntroduction(user.introduction || '');
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error || '');
  };

  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    const error = validatePasswordConfirm(password, value);
    setPasswordConfirmError(error || '');
  };

  const validateForm = () => {
    // 비밀번호 변경은 선택 사항: 둘 다 비어있으면 검증 통과
    if (!password && !passwordConfirm) return true;

    const passwordErr = validatePassword(password);
    const passwordConfirmErr = validatePasswordConfirm(
      password,
      passwordConfirm,
    );

    return !passwordErr && !passwordConfirmErr;
  };

  return {
    isEditing,
    setIsEditing,
    profileUrl,
    setProfileUrl,
    nickname,
    setNickname,
    birthdate,
    setBirthdate,
    email,
    name,
    introduction,
    setIntroduction,
    password,
    passwordConfirm,
    passwordError,
    passwordConfirmError,
    handlePasswordChange,
    handlePasswordConfirmChange,
    validateForm,
  };
};
