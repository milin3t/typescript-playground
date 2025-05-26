import { createContext, useContext, useEffect, useState } from "react";

// Context API 사용
const SidebarContext = createContext<{
  isOpen: boolean; // 사이드바 열림 여부
  // 굳이 두개를 만들 필요는 없긴 한데 isOpen을 이용해서 사이드바가 열릴때? 닫힐때? 에 대한 conditional rendering이 가능
  toggle: () => void; // 사이드바 열림/닫힘 토글 함수
  // 말그대로 요녀석이 있어야 껐다켰다 가능. 그래서 두 개를 만들어야 했다 생각.
}>({
  isOpen: false,
  toggle: () => {},
});

// Provider로 감싸서 자식 컴포넌트에 Context를 제공
export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const stored = localStorage.getItem("sidebar-open");
    return stored === "true"; // 없으면 false가 기본
  });

  useEffect(() => {
    localStorage.setItem("sidebar-open", String(isOpen));
  }, [isOpen]);

  // 이전 상태로 되돌리는 로직은 (prev) => !prev 로 이용
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

// 이걸 전역적으로 사용하기 위해서 커스텀 훅을 만들어줌
export const useSidebar = () => useContext(SidebarContext);
