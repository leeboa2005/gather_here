import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import jey from "@/../public/Main/PrCard/jey.png";
import jjh from "@/../public/Main/PrCard/jjh.png";
import ksj from "@/../public/Main/PrCard/ksj.png";
import kyb from "@/../public/Main/PrCard/kyb.png";
import lba from "@/../public/Main/PrCard/lba.png";
import lhr from "@/../public/Main/PrCard/lhr.png";
import { useEffect, useState } from "react";

const PrCard: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slideSets = [
    [
      {
        // href: "https://nbcamp.spartacodingclub.kr/job-support",
        src: jey,
        alt: "유저 소개 카드",
      },
      {
        // href: "https://nbcamp.spartacodingclub.kr/job-support",
        src: jjh,
        alt: "패스트캠퍼스",
      },
      {
        // href: "https://nbcamp.spartacodingclub.kr/",
        src: ksj,
        alt: "내일배움스파르타 부트캠프",
      },
      {
        // href: "https://nbcamp.spartacodingclub.kr/",
        src: kyb,
        alt: "내일배움스파르타 부트캠프",
      },
      {
        // href: "https://hanghae99.spartacodingclub.kr/reboot",
        src: lba,
        alt: "항해99",
      },
      {
        // href: "https://hanghae99.spartacodingclub.kr/99club-codingtest",
        src: lhr,
        alt: "항해99 스터디",
      },
    ],
  ];

  const [slides, setSlides] = useState(slideSets[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * slideSets.length);
    setSlides(slideSets[randomIndex]);
  }, []);

  return (
    <>
      {" "}
      <h4 className="flex items-center my-3 text-labelNormal">
        <Image src="/Main/mic.svg" alt="마이크 모양 아이콘" width={20} height={20} className="mr-1" />
        자랑스러운 게더_멤버들을 소개할게요
      </h4>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide.src}
            width={322}
            height={256}
            alt={slide.alt}
            className="mx-auto rounded-lg mb-4"
            priority
          />
        ))}
      </Slider>
    </>
  );
};

export default PrCard;
