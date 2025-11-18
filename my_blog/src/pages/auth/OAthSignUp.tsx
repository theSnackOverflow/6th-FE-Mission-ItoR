import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOAuthSignUp } from '@/hooks/useOAuthSignUp';

const OAuthSignUp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useOAuthSignUp();

  const stateData =
    (location.state as {
      email?: string;
      kakaoId?: number;
      profilePicture?: string;
    }) || {};
  const [formData, setFormData] = useState({
    email: stateData.email || '',
    kakaoId: stateData.kakaoId ? String(stateData.kakaoId) : '',
    nickname: '',
    name: '',
    birthDate: '',
    introduction: '',
    profilePicture:
      stateData.profilePicture || 'https://example.com/default-profile.jpg',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let { name } = e.target;
    const { value } = e.target;
    if (name === 'profileImageUrl') {
      name = 'profilePicture';
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.kakaoId) {
      alert('카카오 인증 정보가 없습니다. 다시 로그인해주세요.');
      navigate('/');
      return;
    }
    const submitData = {
      ...formData,
      kakaoId: formData.kakaoId ? Number(formData.kakaoId) : 0,
    };
    mutation.mutate(submitData, {
      onSuccess: () => {
        alert('회원가입 완료!');
        navigate('/');
      },
      onError: () => {
        alert('회원가입 실패, 다시 시도해주세요.');
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">카카오 회원가입</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* email, kakaoId hidden fields */}
        <input type="hidden" name="email" value={formData.email} />
        <input type="hidden" name="kakaoId" value={formData.kakaoId} />
        <div>
          <label
            htmlFor="nickname"
            className="block text-sm font-medium text-gray-700"
          >
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            생년월일
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label
            htmlFor="introduction"
            className="block text-sm font-medium text-gray-700"
          >
            소개
          </label>
          <textarea
            id="introduction"
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label
            htmlFor="profileImageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            프로필 이미지 URL
          </label>
          <input
            type="url"
            id="profileImageUrl"
            name="profileImageUrl"
            value={formData.profilePicture}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-400 text-white font-semibold py-2 rounded hover:bg-yellow-500 transition"
          disabled={mutation.status === 'pending'}
        >
          {mutation.status === 'pending' ? '회원가입 중...' : '회원가입'}
        </button>
      </form>
    </div>
  );
};

export default OAuthSignUp;
