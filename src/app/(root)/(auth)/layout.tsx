export const metadata = {
  title: "@gather_here",
  description: "스터디나 사이드 프로젝트 팀원을 오픈 채팅으로 빠르고 쉽게 찾을 수 있는 gather_here.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <body>{children}</body>;
}
