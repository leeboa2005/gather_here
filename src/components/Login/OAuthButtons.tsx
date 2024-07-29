import Image from 'next/image';

interface OAuthButtonsProps {
  handleLogin: (provider: 'google' | 'kakao' | 'github') => void;
}

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ handleLogin }) => {
  return (
    <>
      <div className="w-80 py-3 left-[40px] top-[122px] absolute bg-[#e6e6e6] rounded-xl flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
        <button
          onClick={() => handleLogin('google')}
          className="flex flex-row items-center space-x-4 transition-transform duration-150 ease-in-out transform active:scale-95"
        >
          <div className="w-[34.84px] h-[34.84px] bg-white rounded-full flex justify-center items-center">
            <Image
              className="w-[34.84px] h-[34.84px]"
              src="/logos/google-logo.png"
              alt="Google Logo"
              width={24}
              height={24}
            />
          </div>
          <span className="font-semibold">Google로 로그인하기</span>
        </button>
      </div>
      <div className="w-80 py-3 left-[40px] top-[192px] absolute bg-[#e6e6e6] rounded-xl flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
        <button
          onClick={() => handleLogin('kakao')}
          className="flex flex-row items-center space-x-4 transition-transform duration-150 ease-in-out transform active:scale-95"
        >
          <div className="w-[34.84px] h-[34.84px] bg-white rounded-full flex justify-center items-center">
            <Image
              className="w-[34.84px] h-[34.84px]"
              src="/logos/kakao-logo.png"
              alt="Kakao Logo"
              width={24}
              height={24}
            />
          </div>
          <span className="font-semibold">Kakao로 로그인하기</span>
        </button>
      </div>
      <div className="w-80 py-3 left-[40px] top-[262px] absolute bg-[#e6e6e6] rounded-xl flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
        <button
          onClick={() => handleLogin('github')}
          className="flex flex-row items-center space-x-4 transition-transform duration-150 ease-in-out transform active:scale-95"
        >
          <div className="w-[34.84px] h-[34.84px] bg-white rounded-full flex justify-center items-center">
            <Image
              className="w-[34.84px] h-[34.84px]"
              src="/logos/github-logo.png"
              alt="Github Logo"
              width={24}
              height={24}
            />
          </div>
          <span className="font-semibold">Github로 로그인하기</span>
        </button>
      </div>
    </>
  );
};

export default OAuthButtons;