// 정규식 패턴
export const VALIDATION_REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,16}$/,
  BIRTHDATE: /^\d{4}-\d{2}-\d{2}$/,
} as const;

// 에러 메시지
export const VALIDATION_MESSAGES = {
  REQUIRED: '*반드시 입력해야 하는 필수 사항입니다.',
  EMAIL_INVALID: '*이메일 형식이 적합하지 않습니다.',
  PASSWORD_INVALID: '* 영문, 숫자, 특수문자를 포함하여 8~16자로 입력해주세요',
  PASSWORD_MISMATCH: '*비밀번호가 일치하지 않습니다',
  BIRTHDATE_FORMAT: '*YYYY-MM-DD 형식으로 입력해주세요.',
  BIRTHDATE_FUTURE: '*생일은 오늘 또는 미래 날짜일 수 없습니다.',
  NICKNAME_MAX_LENGTH: '*닉네임은 최대 20글자입니다.',
  INTRODUCTION_MAX_LENGTH: '*한 줄 소개는 최대 30글자입니다.',
} as const;

// 이메일 검증
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  if (!VALIDATION_REGEX.EMAIL.test(email)) {
    return VALIDATION_MESSAGES.EMAIL_INVALID;
  }
  return null;
};

// 비밀번호 검증
export const validatePassword = (password: string): string | null => {
  if (!password.trim()) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  if (!VALIDATION_REGEX.PASSWORD.test(password)) {
    return VALIDATION_MESSAGES.PASSWORD_INVALID;
  }
  return null;
};

// 비밀번호 확인 검증
export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string,
): string | null => {
  if (!passwordConfirm.trim()) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  if (password !== passwordConfirm) {
    return VALIDATION_MESSAGES.PASSWORD_MISMATCH;
  }
  return null;
};

// 이름 검증
export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  return null;
};

// 생년월일 검증
export const validateBirthdate = (birthdate: string): string | null => {
  if (!birthdate.trim()) {
    return VALIDATION_MESSAGES.REQUIRED;
  }

  if (!VALIDATION_REGEX.BIRTHDATE.test(birthdate)) {
    return VALIDATION_MESSAGES.BIRTHDATE_FORMAT;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const birth = new Date(birthdate);
  birth.setHours(0, 0, 0, 0);

  if (isNaN(birth.getTime()) || birth >= today) {
    return VALIDATION_MESSAGES.BIRTHDATE_FUTURE;
  }

  return null;
};

// 닉네임 검증
export const validateNickname = (nickname: string): string | null => {
  if (!nickname.trim()) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  if (nickname.length > 20) {
    return VALIDATION_MESSAGES.NICKNAME_MAX_LENGTH;
  }
  return null;
};

// 한 줄 소개 검증 (선택 사항)
export const validateIntroduction = (introduction: string): string | null => {
  if (introduction.length > 30) {
    return VALIDATION_MESSAGES.INTRODUCTION_MAX_LENGTH;
  }
  return null;
};

// 회원가입 폼 전체 검증
export const validateSignUpForm = (data: {
  email: string;
  password?: string;
  passwordConfirm?: string;
  name: string;
  birthdate: string;
  nickname: string;
  introduction?: string;
  isSocialLogin?: boolean;
}) => {
  const errors: Record<string, string | null> = {
    email: validateEmail(data.email),
    name: validateName(data.name),
    birthdate: validateBirthdate(data.birthdate),
    nickname: validateNickname(data.nickname),
    introduction: data.introduction
      ? validateIntroduction(data.introduction)
      : null,
  };

  if (!data.isSocialLogin) {
    errors.password = data.password ? validatePassword(data.password) : null;
    errors.passwordConfirm =
      data.password && data.passwordConfirm
        ? validatePasswordConfirm(data.password, data.passwordConfirm)
        : null;
  }

  const isValid = Object.values(errors).every((error) => error === null);

  return { errors, isValid };
};
