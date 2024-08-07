import NavTabs from "@/components/MainPage/NavTab/NavTabs";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s">{children}</div>;
};

export default layout;
