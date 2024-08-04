import Image from "next/image";

const ItEventCardLong = () => {
  return (
    <article className="p-5 bg-fillStrong rounded-2xl text-center shadow-md w-full">
      <div className="flex justify-between items-center mb-3">
        <ul className="flex items-center">
          <li>
            <span className="label-secondary rounded-full text-baseS  px-3 py-1.5 mr-1">D-3</span>
          </li>
          <li className="text-baseS  text-labelNormal ml-2">
            <time dateTime="YYYY-MM-DD">YY.MM.DD</time>
          </li>
        </ul>
        <button aria-label="북마크 자리">북마크</button>
      </div>
      <section>
        <h2 className="text-left text-subtitle font-base truncate mt-5 mb-1 text-labelStrong">행사제목</h2>
        <div className="flex items-center justify-start mb-2 text-left">
          <Image src="/Common/Icons/Location.png" alt="Location icon" width={20} height={20} className="mr-2" />
          <p className="text-baseS  text-labelNeutral">코엑스 그랜드볼룸&아셈볼룸</p>
        </div>
        <div className="w-full h-[125px] bg-fillNeutral shadow-custom rounded-2xl">
          <img src="/path/to/image.jpg" alt="행사 이미지" className="w-full h-full object-cover rounded-2xl" />
        </div>
      </section>
    </article>
  );
};

export default ItEventCardLong;
