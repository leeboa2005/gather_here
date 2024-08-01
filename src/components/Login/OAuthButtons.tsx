import Image from 'next/image';

interface OAuthButtonsProps {
  handleLogin: (provider: 'google' | 'kakao' | 'github') => void;
}

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ handleLogin }) => {
  return (
    <>
      <div className="w-80 py-3 left-[40px] top-[150px] absolute bg-[#ffffff] rounded-xl flex justify-center shadow items-center transition duration-300 ease-in-out transform hover:scale-105 active:scale-95" >
        <button
          onClick={() => handleLogin('google')}
          className="flex flex-row items-center space-x-4 transition-transform duration-150 ease-in-out transform active:scale-95"
        >
          <div className="w-[34.84px] h-[34.84px] rounded-full flex justify-center items-center">
            <Image
              className="w-[34.84px] h-[34.84px]"
              src="/logos/google-logo.png"
              alt="Google Logo"
              width={24}
              height={24}
            />
          </div>
          <span className="font-semibold text-[#2b2b2b]">Google로 시작하기</span>
        </button>
      </div>
      <div className="w-80 py-3 left-[40px] top-[220px] absolute bg-[#fee500] rounded-xl flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
        <button
          onClick={() => handleLogin('kakao')}
          className="flex flex-row items-center space-x-4 transition-transform duration-150 ease-in-out transform active:scale-95"
        >
          <div className="w-[34.84px] h-[34.84px] rounded-full flex justify-center items-center">
            <Image
              className="w-[34.84px] h-[34.84px]"
              src="/logos/kakao_logo.png"
              alt="Kakao Logo"
              width={24}
              height={24}
            />
          </div>
          <span className="font-semibold text-[#2b2b2b]">Kakao로 시작하기</span>
        </button>
      </div>
      <div className="w-80 py-3 left-[40px] top-[290px] absolute bg-[#24292f] rounded-xl flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
        <button
          onClick={() => handleLogin('github')}
          className="flex flex-row items-center space-x-4 transition-transform duration-150 ease-in-out transform active:scale-95"
        >
          <div className="w-[34.84px] h-[34.84px] rounded-full flex justify-center items-center">
            <Image
              className="w-[34.84px] h-[34.84px]"
              src="/logos/github-logo-white.png"
              alt="Github Logo"
              width={24}
              height={24}
            />
          </div>
          <span className="font-semibold text-[#f7f7f7]">Github로 시작하기</span>
        </button>
      </div>
    </>
  );
};

export default OAuthButtons;