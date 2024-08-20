## 💻 @gather_here

<img src="https://github.com/user-attachments/assets/c229353f-3ae5-4338-a96a-2c2e0527d9b5" alt="Group 4" width="800px" />

## 📖 소개 및 개요
- 프로젝트 기간 : 2023.7.16 ~ 8.20
- 배포 URL : [🔗 @gather_here](https://gather-here.com)

#### <img src="https://github.com/user-attachments/assets/42e201d2-f6e9-4269-bd09-37108d5f649e" alt="frontend" style="width: 16px; vertical-align: middle; margin-right: 5px;"/> 서비스 소개 <img src="https://github.com/user-attachments/assets/855c502b-ea52-4f41-b94a-3d1763eee7b9" alt="frontend" style="width: 16px; vertical-align: middle; margin-right: 5px;"/> 

- `@gather_here`는 개발자, 디자이너, 기획자 등 9개의 IT 직군 종사자들과 IT 직군 취업을 목표로 하는 준비생들을 연결해주는 플랫폼입니다.
- 회원가입 시 한 번의 설문으로 나의 정보를 등록해 서비스를 편리하게 이용할 수 있습니다.
- 사용자들은 원하는 프로젝트나 스터디 멤버를 모집하기 위해 게시글을 작성할 수 있으며, 지역 또는 유형별로 게시물을 구분해 볼 수 있습니다.
- 북마크 기능을 통해 원하는 게시물을 저장하고, 북마크한 글과 내가 작성한 글을 한눈에 확인할 수 있습니다.
- 사용자들은 자신에게 맞는 프로젝트와 스터디를 오픈 채팅이나 기재된 연락처를 통해 소통하며 진행할 수 있습니다.
- IT 행사 관련 정보는 캘린더를 통해 한눈에 확인할 수 있습니다.

<details>
<summary>목차</summary>
   
- [팀 소개](#teamintro)
- [아키텍쳐](#architecture)
- [주요 기술](#skill)
- [기술적 의사결정](#technical)
- [프로젝트 구조](#structure)
- [UI](#UI)
- [트러블슈팅](troubleshooting)

</details>

## <span id="teamintro">1.📢 팀 소개</span>
<p>안녕하세요! 5명의 프론트엔드 개발자와 1명의 디자이너로 구성된 <strong>게더 히어</strong>팀입니다.<br>
`게더 히어`는 각기 다른 역량을 가진 우리가 모여, 협업의 시너지를 극대화 시킨다 라는 의미를 가지고 있습니다. <br>
새로운 가능성을 발견하는 팀입니다! 🤲🔥<br>
</p>

| 👑김영범| 💻조은영 | 🔎이하름 | 💡김성준 | 🪄이보아 | 🎨전정현 |
| :---: | :---: | :---: | :---: | :---:  | :---: |
| <img src="https://github.com/user-attachments/assets/8720fef6-8ab1-4350-b9a4-068548e70e1e" width="200">| <img src="https://github.com/user-attachments/assets/b5f761ab-9343-4726-9a70-32e0745567dc" width="200"> | <img src="https://github.com/user-attachments/assets/5a108b91-7992-428e-a8a9-ceb78284685f" width="200"> | <img src="https://github.com/user-attachments/assets/819e65bc-ca66-4dcd-870d-80b6a4c3dbb2" width="200"> | <img src="https://github.com/user-attachments/assets/b0aaa5a1-4e9c-4a6e-8ccb-615b22e6fbd1" width="200"> | <img src="https://github.com/user-attachments/assets/f394d0c9-314a-441e-8683-7f35e12f49f2" width="200"> |
| ![Team%20Leader](https://img.shields.io/badge/-Team%20leader-yellow)  ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb)| ![Deputy%20Leader](https://img.shields.io/badge/-Deputy%20Leader-green) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![Development%20Leader](https://img.shields.io/badge/-Development%20leader-orange)  ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![WorkManagement](https://img.shields.io/badge/-Work%20Management%20leader-f67280) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![Communication%20Leader](https://img.shields.io/badge/-Comunication%20Leader-mint) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![Design%20Leader](https://img.shields.io/badge/-Design%20leader-purple) ![Designer](https://img.shields.io/badge/Designer-004088)|
| github: [kubap](https://github.com/kybaq)| github: [Eunyoung](https://github.com/Eunyoung-Jo) | github: [Hareum](https://github.com/LeeHareum) | github: [SungJoon](https://github.com/ilovezerocokeya)| github: [Boa](https://github.com/leeboa2005) | blog: [Junghyun](https://velog.io/@yardvvorker/posts) |    

## <span id="architecture">2. 🏗 아키텍쳐</span>
<img src="https://github.com/user-attachments/assets/5ffed050-2b2f-4de8-b97b-6be1b11aec33" alt="image" width="800px" />

## <span id="skill">3.🍀주요 기술</span>

<details>
  <summary>로그인</summary>
   
   - 소셜로그인(구글, 카카오, 깃허브)으로 간편하게 로그인을 할 수 있습니다.
   - 처음 소셜로그인을 하는 유저는 간단한 정보를 받습니다.
   - 이미 한번 정보를 받았던 기존의 유저의 경우에 소셜로그인을 하게되면 바로 메인페이지로 이동합니다.
   - 이러한 절차가 번거롭게 느껴지는 유저들을 위한 건너뛰기 기능은 회원에게 default data를 주어서 나중에 필요시 마이페이지에서 따로 정보를 추가할 수 있게 만들었습니다.
   - 간단한 정보를 받는 마지막 단계로서 닉네임은 필수로 받으며, 중복체크와 공백체크를 합니다.
   - 포트폴리오 주소를 저장하기 위한 URL은 선택사항으로서 작성하지 않고 넘어가면 다시 한 번 알림창으로 확인을 거치고 나서 프로필 저장을 할 수 있게 됩니다.
   - 프로필 저장을 통해서 최종적으로 DB에 유저의 정보가 저장되면 마지막 Welcome페이지를 볼 수 있습니다. 
</details>

<details>
  <summary>공고 메인</summary>
 
- 검색기능
- 전체 / 스터티 / 프로젝트 / IT행사 분류
- 게시물 리스트 :  IT행사를 제외한 모든 탭의 전체 게시물을 최신글 순으로 보여줌
- 사이드 요소
    - 캘린더 : 행사가 있는 일자를 표시해주고, 해당 포인터를 클릭하면 미리보기로 정보를 보여주고, 토글버튼을 클릭하면 행사일정이 리스트로 보여지게 됩니다.
    - 오픈톡 : 로그인한 모든 유저들이 참여할 수 있는 채팅방입니다.
- 스터디 / 프로젝트 / IT행사 페이지에서는 마감임박한 게시물을 캐러셀로 보여줌
- 직군 / 방식 / 지역 / 기간 필터로 사용자가 원하는 글만 선택하여 볼 수 있습니다.
  </details>

<details>
  <summary>글 작성 페이지</summary>

- 사용자가 사람을 구하고 싶은 스터디/ 프로젝트를 원하는 직군, 스택 등에 맞게 선택하여 작성할 수 있습니다.
- 임시저장 기능을 구현해 유저가 글쓰기 화면에서 이탈해야 할 경우 임시저장 버튼을 누른다면 이후에 글쓰기 페이지에 들어왔을때 해당 시점의 데이터를 다시 불러올 수 있게 했습니다.
- 본인이 쓴 글에서 수정하기 버튼을 누르면 작성했던 필드값 그대로 다시 작성 페이지에서 수정할 수 있습니다.

</details>

<details>
  <summary>공고 상세페이지</summary>

 - 상세 페이지에서 확인하고 싶은 공고의 상세 정보들을 확인할 수 있습니다.
 - 공유하기 버튼으로 url 복사를, 북마크 버튼으로 관심글 저장을 할 수 있습니다.
 - 본인이 쓴 글인 경우 북마크 옆에 버튼을 따로 만들어 게시글 수정, 삭제가 가능하게 했습니다.
 - 본인이 쓴 글이 아닐 경우 해당 버튼은 노출되지 않게 하였습니다.
</details>

<details>
  <summary>행사 메인</summary>
  
- 행사 정보중 마감이 임박한 행사를 상단에서 슬라이드로 볼 수 있게 구현하였습니다.
- 행사 정보를 리스트 형식으로 편하게 볼 수 있드록 구현하였습니다.
  
</details>

<details>
  <summary>행사 상세</summary>
   
- 상세 페이지에서 흥미있는 행사의 상세 정보를 확인할 수 있습니다.
- 공유하기 버튼으로 url 복사를, 북마크 버튼으로 관심글 저장을 할 수 있습니다.
- 신청하기 버튼을 누르면 해당 사이트의 신청 페이지로 이동합니다.

</details>

<details>
  <summary>마이페이지</summary>
   
  - 마이페이지 네비게이션 
    - 마이페이지 내에 따로 네비게이션이 있어, 마이페이지 정보를 편하게 확인할 수 있습니다. 
  - 프로필 사진 수정
    - 직군별 아이콘으로 설정 : `gather_here`만의 9개의 직군 아이콘으로 프로필 사진 설정이 가능합니다.
    - 프로필 변경 : 사용자가 원하는 프로필 사진으로도 설정 가능합니다.
  - 내정보 수정
    - 회원가입시 입력한 정보 수정 : 회원가입시 입력한 정보를 언제든지 수정 가능합니다. 
   - 내 작성글
     - 내 작성글 확인 : 내 작성글을 한눈에 볼 수 있습니다. 
     - 내 작성글 수정, 삭제 : 내 작성글 카드를 호버하면 수정버튼, 삭제버튼이 나타나, 바로 수정,삭제 가능합니다.
    - 내 관심글
     - 내 관심글 확인 : 내가 북마크한 게시글을 스터디/ 프로젝트 / IT 행사 별로 한눈에 볼 수 있습니다. 
</details>

## <span id="technical">4.🧩기술적 의사결정</span>

### Framework & Library

<div>
  <h4>
    <img src="https://cdn.icon-icons.com/icons2/2148/PNG/512/nextjs_icon_132160.png" alt="NextJS Icon" width="20px" style="vertical-align: middle; margin-right: 10px;" />
    NextJS (App Router)
  </h4>
  <p>Next.js는 자동으로 페이지 간 코드를 분할하여 필요한 코드만을 클라이언트에 전송하여 초기 로딩 시간을 최적화합니다. 그중에서도 Next.js의 app router는 서버 컴포넌트를 지원하고 페이지 라우터보다 더 많은 유연성과 기능을 제공하여 채팅 등 실시간 데이터 통신이 동적이고 성능 최적화된 애플리케이션을 빠르게 구축할 수 있도록 도와주기 때문에 프레임워크로 Next.js app router를 선택하였습니다.</p>
</div>

### State Management Library

<div>
  <h4>
    <img src="https://github.com/user-attachments/assets/0bb4fc11-672c-4e6e-832b-9745fa13475b" alt="Zustand Icon" width="30px" style="vertical-align: middle; margin-right: 10px;" />
    Zustand
  </h4>
  <p>Zustand를 사용하게 된 이유는 설정이 복잡하지 않고 코드가 직관적이기 때문에 상태관리를 빠르고 쉽게 구현할 수 있기 때문입니다. 또한 Zustand는 전역 상태와 로컬 상태를 구분하지 않고 사용이 가능해서 상태 관리의 복잡성을 줄여주는 장점이 있어 React 외의 환경에서도 사용할 수도 있어서 유연하게 개발을 가능하게 합니다.</p>
</div>

<div>
  <h4>
    <img src="https://github.com/user-attachments/assets/5440caef-f393-4c5f-9294-1c400fc50960" alt="ContextAPI Icon" width="20px" style="vertical-align: middle; margin-right: 10px;" />
    ContextAPI
  </h4>
  <p>Context API를 전역 상태 관리에 사용한 이유는 프로젝트에서 users 테이블 정보를 여러 컴포넌트에서 공동적으로 불러와야 했기 때문에 사용하였습니다. Context API는 리액트 애플리케이션에서 상태를 전역으로 관리할 때 간단하면서도 효율적인 도구였습니다. 불필요한 외부 라이브러리를 추가하지 않고도 쉽게 설정할 수 있어 개발 속도를 높일 수 있었고, 특정 컴포넌트 트리에서 상태를 공유하고 업데이트하기에 매우 적합했습니다. 이를 통해 코드의 복잡도를 줄이고, 데이터 관리의 일관성을 유지할 수 있었습니다.</p>
</div>

### Database

<div>
  <h4>
    <img src="https://github.com/user-attachments/assets/15bcf8d5-ff50-4890-8923-1099351626ad" alt="ContextAPI Icon" width="20px" style="vertical-align: middle; margin-right: 10px;" />
    ContextAPI
  </h4>
  <p>Context API를 전역 상태 관리에 사용한 이유는 프로젝트에서 users 테이블 정보를 여러 컴포넌트에서 공동적으로 불러와야 했기 때문에 사용하였습니다. Context API는 리액트 애플리케이션에서 상태를 전역으로 관리할 때 간단하면서도 효율적인 도구였습니다. 불필요한 외부 라이브러리를 추가하지 않고도 쉽게 설정할 수 있어 개발 속도를 높일 수 있었고, 특정 컴포넌트 트리에서 상태를 공유하고 업데이트하기에 매우 적합했습니다. 이를 통해 코드의 복잡도를 줄이고, 데이터 관리의 일관성을 유지할 수 있었습니다.</p>
</div>

### Design

<div>
  <h4>
    <img src="https://github.com/user-attachments/assets/277d98e2-2d9d-45e6-a8c1-b186ef40acc5" alt="ContextAPI Icon" width="20px" style="vertical-align: middle; margin-right: 10px;" />
   Tailwind CSS
  </h4>
  <p>유지보수가 용이하며 추가적인 CSS 파일이나 코드 생성없이 빠른 스타일링이 가능합니다. 해당 코드를 보더라도 어떠한 스타일링인지 추측이 가능하며 조건부 스타일링도 쉽게 구현이 가능하며 NextJS에서 원활하게 사용할 수 있습니다.</p>
</div>

### Collaboration Tool

<div>
  <h4>
    <img src="https://github.com/user-attachments/assets/56874eb2-7f98-4126-a403-db52373a9d93" alt="Figma Icon" width="20px" style="vertical-align: middle; margin-right: 10px;" />
     Figma
  </h4>
  <p>실시간 협업과 디자인 시스템 관리를 지원하는 강력한 UI/UX 디자인 도구입니다. 클라우드 기반으로 언제 어디서나 접근할 수 있으며, 디자이너와 개발자 간의 원활한 협업을 통해 디자인 워크플로우를 효율적으로 관리할 수 있습니다.</p>
</div>

<div>
  <h4>
    <img src="https://github.com/user-attachments/assets/ae7bd9a1-1224-4fd5-8a36-6228cfede1e5" alt="Excalidraw Icon" width="20px" style="vertical-align: middle; margin-right: 10px;" />
     Excalidraw
  </h4>
  <p>직관적이고 사용하기 쉬운 인터페이스를 통해 손으로 그린 듯한 다이어그램을 빠르게 작성할 수 있습니다. 실시간 협업 기능과 오픈소스 특성을 가지고 있어 팀원 간의 아이디어 공유 및 시각적 커뮤니케이션을 효율적으로 지원합니다.</p>
</div>

### Programing Language

<div>
  <h4>
    <img src="https://github.com/user-attachments/assets/266c60d1-ca8f-4042-824f-4e61271fed39" alt="TypeScript Icon" width="20px" style="vertical-align: middle; margin-right: 10px;" />
     Figma
  </h4>
  <p>타입을 지정하여 JavaScript를 사용 했을 때 개발자에 의해 발생하는 버그 및 에러를 미리 방지합니다. 또한, 누구나 접근하지 못하도록 하여 코드의 변형을 막아 코드의 안정성을 높여주며 배포 전 런타임에 에러를 미리 파악 하여 잡을 수 있습니다. 타입을 미리 지정하면 해당 데이터 입력시 타입에 맞는 데이터를 ‘자동완성’ 과 같은 기능을 제공하기에 협업에서의 개발 생산성을 향상시킬 수 있습니다.</p>
</div>

### Deployment Platform

<div>
  <h4>
    <img src="https://github.com/user-attachments/assets/7c761176-efbb-4715-b3a3-fde2032dff2b" alt="Vercel Icon" width="20px" style="vertical-align: middle; margin-right: 10px;" />
     Vercel
  </h4>
  <p>타입을 지정하여 JavaScript를 사용 했을 때 개발자에 의해 발생하는 버그 및 에러를 미리 방지합니다. 또한, 누구나 접근하지 못하도록 하여 코드의 변형을 막아 코드의 안정성을 높여주며 배포 전 런타임에 에러를 미리 파악 하여 잡을 수 있습니다. 타입을 미리 지정하면 해당 데이터 입력시 타입에 맞는 데이터를 ‘자동완성’ 과 같은 기능을 제공하기에 협업에서의 개발 생산성을 향상시킬 수 있습니다.</p>
</div>


## <span id="structure">5.📦프로젝트 구조</span>

``` plaintext 
├─ public
│  ├─ assets
│  │  ├─ gif
│  │  ├─ header
│  │  ├─ mypage
│  │  ├─ arrowsmall.svg
│  │  ├─ back.svg
│  │  ├─ blank.svg
│  │  ├─ cardarrow.svg
│  │  ├─ delete.svg
│  │  ├─ down.svg
│  │  ├─ toastcancel.svg
│  │  ├─ toastcheck.svg
│  │  └─ top.svg
│  ├─ Calender
│  ├─ Chat
│  ├─ Common
│  ├─ Detail
│  ├─ Favicon
│  ├─ logos
│  ├─ Main
│  ├─ MyPage
│  └─ Post
├─ src
│  ├─ app
│  │  ├─ (auth)
│  │  ├─ (mainpage)
│  │  ├─ api
│  │  ├─ eventsdetail
│  │  ├─ maindetail
│  │  ├─ mypage
│  │  ├─ post
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  └─ page.tsx
│  ├─ assets
│  │  ├─ loadingBar.json
│  │  └─ loadingSpinner.json
│  ├─ components
│  │  ├─ Common
│  │  ├─ EventsDetail
│  │  ├─ Layout
│  │  ├─ Login
│  │  ├─ MainDetail
│  │  ├─ MainPage
│  │  ├─ MyPage
│  │  ├─ Post
│  │  └─ Signup
│  ├─ fonts
│  ├─ hooks
│  ├─ lib
│  ├─ provider
│  ├─ store
│  ├─ types
│  ├─ utils
│  ├─ middleware.ts
│  ├─ supabase
│  ├─ .env.local
│  ├─ .eslintrc.json
│  ├─ .gitignore
│  ├─ .nvmrc
│  ├─ .prettierrc
│  ├─ next-env.d.ts
│  ├─ next.config.mjs
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ README.md
│  ├─ tailwind.config.ts
│  └─ tsconfig.json

```
## <span id="ui"> 6. UI 🎨</span>

#### 시작하기, 메인페이지 게시물 리스트 

<img src="https://github.com/user-attachments/assets/5e8e84d3-78c0-48ff-8454-81a74ddd4676" alt="프로젝트 결과 1" width="800px" />

#### IT 행사, 메인페이지 채팅, PR 섹션 

<img src="https://github.com/user-attachments/assets/620a8201-9925-4c98-a5b6-932515e7f033" alt="프로젝트 결과 2" width="800px" />
<img src="https://github.com/user-attachments/assets/741e7b75-032a-4a63-9787-3bb823fd1c41" alt="프로젝트 결과 3" width="800px" />

#### 마이페이지 
<img src="https://github.com/user-attachments/assets/f45c4fb7-1333-4d0c-be3d-1d3d2c2c0131" alt="프로젝트 결과 4" width="800px" />


## <span id="troubleshooting"> 7. 트러블 슈팅🔨</span>

### react-select로 다중 선택을 구현하며 server와 client의 id가 다른 이슈

#### 이슈 발생

- **경고: Warning: Prop `id` did not match. Server: "react-select-2-live-region" Client: "react-select-3-live-region"**
<img src="https://github.com/user-attachments/assets/9a7f652b-a51b-4ab0-87c3-3e291ffa5a8f" alt="image" width="600px" />

#### 해결책 
- const Select = dynamic(() => import("react-select"), { ssr: false });으로 클라이언트측에서 랜더링 될 수 있게 동적으로 import
- Select 컴포넌트에 instanceId={uuid}를 설정. instanceId prop을 추가하여 해결하였습니다.

### 로그인 후 signupForm에서 DB에 정보저장 없이 탈출하면 생기는 이슈

#### 이슈 발생

- 기존의 플로우는 소셜로그인 이후에 signup페이지로 이동하고 signupForm안에서 받은 정보를 받아서 프로필 저장을 해야지만 Users테이블로 정보가 저장되고 메인페이지로 넘어가서부터 유저의 사이트 활동이 가능해지는 방식이었다. 

 - 이 플로우의 문제점은 추가적인 정보를 유저에게 받는 과정에서 유저가 뒤로가기를 하거나 url을 변경해서 다른 페이지로 이동하려고 하거나, 탭을 종료하고 다시 사이트에 들어온 후에 소셜로그인 자체는 되어있지만 Users테이블에는 정보가 하나도 남아있지 않다는 것이었다.

#### 해결책 
- 가장 중요했던 포인트는 유저의 정보를 DB에 넣는 시점이었던 것을 깨닫고
유저가 로그인을 하고 Signup페이지로 넘어가기 직전에 Default Data를 insert하는 것이 포인트였다.
- 그리고 기존에 프로필 저장하기를 클릭했을때 insert 하던 것은 update만 가능하게 만들었다.
- 그렇게되면 유저는 로그인을하고 자연스럽게 Default Data를 가진 상태로 Signup페이지로 이동하게 될 것이고
signupForm을 어떤 방식으로 탈출하더라도 메인페이지의 모든 기능을 다 사용할 수 있는 것이었다.
필요하다면 유저는 언제든지 마이페이지에 가서 자신의 정보를 update 할 수 있는 구조가 된다.

### Next.js 배포 후 발생한 hydration 오류

#### 이슈 발생
- 페이지 배포 후 콘솔 창에서 다음과 같은 오류가 계속해서 발생함.
<img src="https://github.com/user-attachments/assets/0303026c-c905-44a5-b9b4-a95d5c689ace" alt="image" width="600px" />

#### 해결책 
- 서버 컴포넌트에서 Date.now()를 사용하던 부분이 있었는데, 클라이언트가 페이지를 렌더링할 때 서버에서 전달된 HTML의 값과 브라우저에서 렌더링 시점의 값이 달라 오류가 발생했습니다.

```javascript 
const ItEventCardLong: NextPage<EventsCardProps> = ({ post }) => {
  const deadlineDate = new Date(post.date_done);
  const daysLeft = Math.ceil(
    (deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const displayDaysLeft = daysLeft === 0 ? "D-day" : `D-${daysLeft}`;

  return (
    <ul className="flex items-center">
      <li>
        <span className="label-secondary rounded-full text-baseS  px-3 py-1.5 mr-1">
          {displayDaysLeft}
        </span>
      </li>
      <li className="text-baseS  text-labelNormal ml-2">
        <time dateTime="YYYY-MM-DD">
          {dayjs(post.date_start).format("YYYY-MM-DD")}
        </time>
      </li>
    </ul>
  );
};
```
- 위 코드에서 서버에서 문서를 생성할 때 사용된 Date.now() 값과 브라우저에서 렌더링 시 사용하는 값이 달라지면서, 이로 인해 최종적으로 새로고침이 한 번 더 발생하는 문제가 있었습니다.

```javascript 
const ItEventCardShort: NextPage<EventsCardProps> = ({ post }) => {
  const { user: currentUser } = useUser();
  const [isClient, setIsClient] = useState<boolean>(false);
  const today = dayjs();
  const deadlineDate = dayjs(post.date_done);
  // const daysLeft = Math.ceil((deadlineDate.unix() - now.unix()) / (1000 * 60 * 60 * 24));
  const daysLeft = today.diff(deadlineDate, "d", true);
  const displayDaysLeft =
    daysLeft === 0 ? "D-day" : daysLeft < 0 ? `D${daysLeft.toFixed(0)}` : `D+${Math.ceil(daysLeft)}`;

  useEffect(() => {
    setIsClient(true);

    return () => {
      setIsClient(false);
    };
  }, []);

  return (
    {isClient ? (
        <ul className="flex justify-between items-center">
        <li>
            <span className="label-secondary rounded-full text-baseS px-3 py-1.5">{displayDaysLeft}</span>
        </li>
        <li>
            <time dateTime={post.date_done} className="text-baseS text-labelNormal">
            {dayjs(post.date_done).format("YYYY-MM-DD")}
            </time>
        </li>

        <LikeButton eventId={post.event_id} currentUser={currentUser} />
        </ul>
) : null})
}
```

- `Date.now()` 값을 사용하는 부분이 컴포넌트가 마운트된 후에 렌더링되도록 useEffect()를 사용하여, 컴포넌트가 정상적으로 마운트된 이후에 날짜가 렌더링되도록 구현했습니다.

