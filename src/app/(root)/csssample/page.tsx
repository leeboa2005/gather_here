"use client";
import Image from "next/image";

/* type, label, htmlFor, mt-3(간격), width는 작업하는 내용에 맞게 변경하여 사용하시면 됩니다.
   input 사용할 때 label은 화면에 보이지는 않지만(sr-only) 웹 접근성을 위해 추가하였습니다.
*/
const Page = () => {
  return (
    <main className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s">
      <div className="w-96">
        {/* input */}
        <label className="sr-only" htmlFor="">
          input창에 대한 내용
        </label>
        <input id="" className="shared-input mt-3" type="" placeholder="테스트용" />

        {/* input - gray */}
        <label className="sr-only" htmlFor="">
          input창에 대한 내용
        </label>
        <input id="" className="shared-input-gray mt-3" type="" placeholder="테스트용" />

        {/* select */}
        <select id="" className="shared-select mt-3 block">
          <option value="">프론트엔드</option>
          <option value="">백엔드</option>
          <option value="">디자이너</option>
          <option value="">IOS</option>
          <option value="">안드로이드</option>
          <option value="">데브옵스</option>
          <option value="">PM</option>
          <option value="">기획자</option>
          <option value="">마케터</option>
        </select>

        <label className="sr-only" htmlFor="">
          지역 선택
        </label>
        <select id="" className="shared-select mt-3 block">
          <option value="">서울</option>
          <option value="">부산</option>
          <option value="">대구</option>
          <option value="">인천</option>
          <option value="">광주</option>
          <option value="">대전</option>
          <option value="">울산</option>
          <option value="">세종</option>
          <option value="">경기</option>
          <option value="">강원</option>
          <option value="">충북</option>
          <option value="">충남</option>
          <option value="">전북</option>
          <option value="">전남</option>
          <option value="">경북</option>
          <option value="">경남</option>
          <option value="">제주</option>
        </select>

        <label className="sr-only" htmlFor="">
          기술스택 선택
        </label>
        <select id="" className="shared-select mt-3 block">
          <option value="">JavaScript</option>
          <option value="">TypeScript</option>
          <option value="">React</option>
          <option value="">Vue</option>
          <option value="">Svelte</option>
          <option value="">Nextjs</option>
          <option value="">Nodejs</option>
          <option value="">Java</option>
          <option value="">Spring</option>
          <option value="">Go</option>
          <option value="">Nestjs</option>
          <option value="">Kotlin</option>
          <option value="">Express</option>
          <option value="">MySQL</option>
          <option value="">MongoDB</option>
          <option value="">Python</option>
          <option value="">Django</option>
          <option value="">PHP</option>
          <option value="">GraphQL</option>
          <option value="">Firebase</option>
          <option value="">Flutter</option>
          <option value="">Swift</option>
          <option value="">ReactNative</option>
          <option value="">Unity</option>
          <option value="">AWS</option>
          <option value="">Kubernetes</option>
          <option value="">Docker</option>
          <option value="">Git</option>
          <option value="">Figma</option>
        </select>

        {/* select - gray */}
        <label className="sr-only" htmlFor="">
          select 창에 대한 내용
        </label>
        <select id="" className="shared-select-gray mt-3 block">
          <option value="">프론트엔드</option>
          <option value="">백엔드</option>
          <option value="">디자이너</option>
          <option value="">IOS</option>
          <option value="">안드로이드</option>
          <option value="">데브옵스</option>
          <option value="">PM</option>
          <option value="">기획자</option>
          <option value="">마케터</option>
        </select>

        <label className="sr-only" htmlFor="">
          모집인원 선택
        </label>
        <select id="" className="shared-select-gray mt-3 block">
          <option value="">1인</option>
          <option value="">2인</option>
          <option value="">3인</option>
          <option value="">4인</option>
          <option value="">5인 이상</option>
        </select>

        {/* button - green */}
        <button type="submit" className="shared-button-green mt-3">
          테스트
        </button>

        {/* button - gray */}
        <button type="submit" className="shared-button-gray-full mt-3">
          테스트
        </button>

        {/* button - outline */}
        <button type="submit" className="shared-button-outline mt-3">
          테스트
        </button>

        <button type="button" className="tab-button mt-3" aria-label="전체 보기">
          전체
        </button>

        {/* button - circle */}
        <div>
          <button type="button" className="circle-button mt-3" aria-label="아이콘 버튼">
            <Image src="/Common/Icons/close.png" alt="닫기 버튼" width={21} height={21} />
          </button>
          <button type="button" className="circle-button-gray mt-3 mb-3" aria-label="회색 아이콘 버튼">
            <Image src="/Common/Icons/close.png" alt="닫기 버튼" width={21} height={21} />
          </button>
        </div>

        <button className="square-button-small mb-3">
          <Image src="/Common/Icons/user.png" alt="유저 버튼 아이콘" width={24} height={24} />
        </button>

        {/* button - tab */}
        <button type="button" className="square-button square-button-default mt-3">
          기본
        </button>

        {/* button - square */}
        <div className="grid grid-cols-3 gap-1 mt-3 w-[280px]">
          <button type="submit" className="square-button button-frontend" aria-label="프론트엔드">
            프론트엔드
          </button>
          <button type="submit" className="square-button button-backend" aria-label="백엔드">
            백엔드
          </button>
          <button type="submit" className="square-button button-designer" aria-label="디자이너">
            디자이너
          </button>
          <button type="submit" className="square-button button-ios" aria-label="IOS">
            IOS
          </button>
          <button type="submit" className="square-button button-android" aria-label="안드로이드">
            안드로이드
          </button>
          <button type="submit" className="square-button button-devops" aria-label="데브옵스">
            데브옵스
          </button>
          <button type="submit" className="square-button button-pm" aria-label="PM">
            PM
          </button>
          <button type="submit" className="square-button button-planner" aria-label="기획자">
            기획자
          </button>
          <button type="submit" className="square-button button-marketer" aria-label="마케터">
            마케터
          </button>
        </div>
      </div>

      {/* button - login */}
      <button className="shared-button-google flex items-center justify-center  mt-3" aria-label="구글로 로그인하기">
        <Image src="/logos/google-logo.png" alt="구글 로고" width={30} height={30} className="mr-2" />
        구글로 로그인하기
      </button>
      <button className="shared-button-kakao flex items-center justify-center  mt-3" aria-label="카카오로 로그인하기">
        <Image src="/logos/kakao-logo.png" alt="카카오 로고" width={22} height={22} className="mr-2" />
        카카오로 로그인하기
      </button>
      <button className="shared-button-github flex items-center justify-center  mt-3" aria-label="깃허브로 로그인하기">
        <Image src="/logos/github-logo-white.png" alt="깃허브 로고" width={24} height={24} className="mr-2" />
        깃허브로 로그인하기
      </button>

      {/* button - label */}
      <div className="w-96 mb-10">
        <div className="label label-default mt-3">
          <span>D-31</span>
        </div>
        <div className="label label-secondary mt-3">
          <span>D-3</span>
        </div>
        <div className="label label-primary mt-3">
          <span>컨퍼런스</span>
        </div>
      </div>
    </main>
  );
};

export default Page;
