'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import OAuthButtons from './OAuthButtons';
import { useAuthStore } from '@/store/useAuthStore';
import { useModal } from '@/provider/ContextProvider';

const LoginForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuthStore();
  const { closeModal } = useModal();

  const handleLogin = async (provider: 'google' | 'kakao' | 'github') => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'http://localhost:3000/api/auth/callback',
      },
    });

    if (error) {
      console.error(`${provider} 로그인 오류:`, error);
      setError(`Failed to log in with ${provider}. ${error.message}`);
      setLoading(false);
      return;
    }

    if (data) {
       router.push('/'); 
    } else {
      console.error('Login data is empty.');
      setError('Login failed. Please try again.');
    }

    setLoading(false);
  };

  const handleClose = () => {
    closeModal();
    router.push('/');
  };

  return (
    <div className="w-[400px] h-[500px] relative bg-white rounded-[20px]">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        &times;
      </button>
      <div className="left-[114px] top-[30px] absolute text-center text-black/20 text-2xl font-medium font-['Pretendard JP'] leading-9">
        3초만에 가입하고 <br />대화 시작하기
      </div>

      {error && (
        <div className="left-[40px] top-[100px] absolute text-center text-red-500">
          {error}
        </div>
      )}

      {loading ? (
        <div className="left-[40px] top-[150px] absolute text-center">
          <span className="text-blue-500">로그인 중...</span>
        </div>
      ) : (
        <OAuthButtons handleLogin={handleLogin} />
      )}

      <div className="w-80 left-[40px] top-[400px] absolute text-center text-[#999999] text-xs font-medium font-['Pretendard JP'] leading-tight">
        로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을
        의미하며, 서비스 이용을 위해 이메일과 이름, 프로필 이미지를
        수집합니다.
      </div>
    </div>
  );
};

export default LoginForm;