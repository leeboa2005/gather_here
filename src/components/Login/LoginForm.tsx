import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import OAuthButtons from "./OAuthButtons";
import { useModal } from "@/provider/ContextProvider";
import useSignupStore from "@/store/useSignupStore";

const LoginForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useSignupStore();
  const { closeModal } = useModal();

  const handleLogin = async (provider: "google" | "kakao" | "github") => {
    setLoading(true);
    setError(null);


    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process?.env?.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    });

    if (error) {
      console.error(`${provider} 로그인 오류:`, error);
      setError(`Failed to log in with ${provider}. ${error.message}`);
      setLoading(false);
      return;
    }

    if (data) {
      router.push("/");
    } else {
      console.error("Login data is empty.");
      setError("Login failed. Please try again.");
    }

    setLoading(false);
  };

  const handleClose = () => {
    closeModal();
    router.push("/");
  };

  return (
    <div className="s:w-[370px] s:h-[550px] w-[430px] h-[580px] relative bg-background rounded-[20px] p-4 select-none">
      <div className="s:left-[120px] s:top-[40px] left-[150px] top-[30px] absolute text-center  #ffffff text-4xl font-medium font-['Pretendard JP'] leading-9">
        가입하기
      </div>

      <div className="s:left-[70px] s:top-[90px] left-[100px] top-[90px] absolute text-center  text-[#9a9a9a] text-l  font-normal font-['Pretendard'] leading-relaxed">
        1분만에 SNS로 가입하고 <br /> 나에게 꼭 맞는 동료들을 만나보세요!
      </div>

      {error && <div className="left-[40px] top-[100px] absolute text-center text-red-500">{error}</div>}

      {loading ? (
        <div className="left-[40px] top-[150px] absolute text-center">
          <span className="text-[#212121]">로그인 중...</span>
        </div>
      ) : (
        <OAuthButtons handleLogin={handleLogin} />
      )}

      <div className="w-80 s:left-[25px] s:top-[440px] left-[55px] top-[440px] absolute text-center text-[#999999] text-xs font-medium font-['Pretendard JP'] leading-tight">
        로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며, 서비스 이용을 위해 이메일과 이름, 프로필
        이미지를 수집합니다.
      </div>
    </div>
  );
};

export default LoginForm;
