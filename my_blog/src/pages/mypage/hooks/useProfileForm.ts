import { useState, useEffect } from 'react';
import { getMyInfo } from '../../../api/userAPI';
import {
  validatePassword,
  validatePasswordConfirm,
} from '../../../utils/validation';

export const useProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string | undefined>('');

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
