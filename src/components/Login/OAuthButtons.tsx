import Image from 'next/image';

interface OAuthButtonsProps {
  handleLogin: (provider: 'google' | 'kakao' | 'github') => void;
}

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ handleLogin }) => {
  return (
  <>
     <div className="w-80 py-3 s:left-[30px] s:top-[170px] left-[65px] top-[180px] absolute transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
  <button
    onClick={() => handleLogin('google')}
    className="shared-button-google flex items-center space-x-4"
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
<div className="w-80 py-3 s:left-[30px] s:top-[240px] left-[65px] top-[250px] absolute transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
  <button
    onClick={() => handleLogin('kakao')}
    className="shared-button-kakao flex items-center space-x-4"
  >
    <div className="w-[34.84px] h-[34.84px] rounded-full flex justify-center items-center">
      <Image
        className="w-[34.84px] h-[34.84px]"
        src="/logos/kakao-logo.png"
        alt="Kakao Logo"
        width={24}
        height={24}
      />
    </div>
    <span className="font-semibold text-[#2b2b2b]">Kakao로 시작하기</span>
  </button>
</div>
<div className="w-80 py-3 s:left-[30px] s:top-[310px] left-[65px] top-[320px] absolute transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
  <button
    onClick={() => handleLogin('github')}
    className="shared-button-github flex items-center space-x-4"
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