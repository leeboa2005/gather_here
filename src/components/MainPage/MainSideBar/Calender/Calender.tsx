"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import "./fullcalender.css";
import { NextPage } from "next";
import { Tables } from "@/types/supabase";
import CalenderLoader from "@/components/Common/Skeleton/CalenderLoader";

const detectMobileDevice = () => {
  const width = 1068;

  return window.innerWidth < width;
}; // UserAgent 이용해야할지 ?

const Calender: NextPage = () => {
  const calenderRef = useRef<FullCalendar | null>(null); // 캘린더 객체 내부의 메서드를 사용하기 위해 정의함, | null 인 이유는 렌더링 이전에는 null 인 상태기 때문에 안정성을 위해 추가.
  const [isGrid, setIsGrid] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = detectMobileDevice();
      setIsMobileDevice(isMobileDevice);
    };

    handleResize();

    // resize 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getEvents = async () => {
    try {
      const response = await fetch("/api/events");

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const { data } = await response.json(); // 캘린더에 표기하기 위해 가져온 행사 일정의 날짜 형식을 바꿔줘야 할 수도 있음. start, end => yyyy-mm-dd 로만 바꾸면 될 듯

      const events = data.map((event: Tables<"IT_Events">) => ({
        title: event.title,
        start: dayjs(event.date_start).format("YYYY-MM-DD"),
        end: dayjs(event.date_done).format("YYYY-MM-DD"),
        description: event.location,
      }));

      return events;
    } catch (error) {
      console.error("Failed to fetch events:", error);
      throw new Error("이벤트를 불러오는 데 문제가 발생했습니다.");
    }
  };

  let {
    data: IT_Events,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["IT_Events"],
    queryFn: getEvents,
  });

  if (isPending) {
    return <CalenderLoader />;
  } else if (isError) {
    console.error(error);
    return <div>로딩 실패했습니다..</div>;
  }

  return (
    <div className="custom_calender mb-6">
      <h4 className="flex ml-1 mb-4 m:ml-3 s:ml-3 text-fontWhite">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.0864 3.84971C11.3373 4.39033 10.7273 5.10113 10.3066 5.92361C9.88593 6.74609 9.66662 7.65672 9.66672 8.58054V8.61787C9.67139 9.31787 9.79972 9.98987 10.0296 10.6117C10.2162 11.111 9.79155 11.6734 9.31789 11.4284C8.43688 10.9721 7.6868 10.2988 7.13855 9.47187C6.90289 9.11721 6.38255 9.04837 6.14922 9.40421C5.3798 10.5756 4.97972 11.951 5.00079 13.3524C5.02186 14.7538 5.4631 16.1165 6.26739 17.2643C7.07168 18.412 8.20199 19.2919 9.51199 19.7901C10.822 20.2882 12.2514 20.3817 13.6151 20.0583C14.9788 19.7349 16.214 19.0097 17.1609 17.9764C18.1077 16.9431 18.7226 15.6494 18.9259 14.2627C19.1293 12.876 18.9116 11.4602 18.3013 10.1986C17.6909 8.93696 16.7159 7.88761 15.5024 7.18637L15.4977 7.17821C14.3264 6.50354 13.427 5.44159 12.9544 4.17521C12.8191 3.81354 12.3979 3.62571 12.0864 3.84971ZM12.9964 11.0562C13.5466 11.2194 14.0483 11.5153 14.4573 11.918C14.8663 12.3206 15.17 12.8177 15.3417 13.3653C15.5134 13.9129 15.5479 14.4944 15.4421 15.0585C15.3362 15.6225 15.0934 16.152 14.7348 16.6001C14.3763 17.0483 13.9131 17.4014 13.386 17.6284C12.8589 17.8555 12.284 17.9495 11.712 17.9021C11.1401 17.8547 10.5885 17.6675 10.1059 17.3569C9.62333 17.0462 9.22451 16.6217 8.94455 16.1207C8.70539 15.6949 9.19539 15.311 9.66789 15.4324C10.3832 15.6168 11.1322 15.6288 11.8531 15.4674C12.1891 15.3915 12.3349 15.017 12.2276 14.6904C12.0763 14.2239 11.9995 13.7364 12.0001 13.246C12.0001 12.5635 12.1471 11.916 12.4096 11.3315C12.4573 11.2223 12.5432 11.1341 12.6512 11.0837C12.7592 11.0332 12.882 11.0227 12.9964 11.0562Z"
            fill="#C3E88D"
          />
        </svg>
        HOT한 IT 행사 놓치지 마세요
      </h4>
      <FullCalendar
        // 공통 옵션
        aspectRatio={0.678} // 큰 값으로 설정하면 더 작게 보임
        customButtons={{
          viewChanger: {
            click() {
              if (isGrid) {
                calenderRef.current?.getApi().changeView("listMonth");
                setIsGrid(false);
              } else {
                calenderRef.current?.getApi().changeView("dayGridMonth");
                setIsGrid(true);
              }
            },
          },
        }}
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        ref={calenderRef}
        initialView={`${isMobileDevice ? "listMonth" : "dayGridMonth"}`}
        locale="ko"
        events={IT_Events}
        headerToolbar={
          isMobileDevice
            ? {
                start: "prev",
                center: "title",
                end: "next",
              }
            : { start: "title", end: "prev next viewChanger" }
        }
        titleFormat={(date) => {
          return date.date.year + ". " + String(date.date.month + 1).padStart(2, "0");
        }}
        // Grid View 옵션
        dayMaxEventRows={0}
        dayCellContent={(cellContent) => {
          return cellContent.dayNumberText.replace("일", "");
        }}
        firstDay={1}
        moreLinkContent={(arg) => {
          return arg.shortText;
        }}
        windowResize={() => {
          if (isMobileDevice) {
            calenderRef.current?.getApi().changeView("listMonth");
          } else {
            calenderRef.current?.getApi().changeView("dayGridMonth");
          }
        }}
        // List View 옵션
        allDayText=""
        displayEventTime={false}
        eventDisplay="list-item"
        // 장소 정보 표시
        eventContent={(arg) => {
          const title = document.createElement("div");
          title.classList.add("fc-event-title");
          title.textContent = arg.event.title;

          const description = document.createElement("div");
          description.classList.add("fc-event-description");
          description.innerHTML = `<svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.99996 0C6.30978 0 7.56595 0.520324 8.49213 1.44651C9.41831 2.37269 9.93864 3.62886 9.93864 4.93868C9.93864 7.02559 8.47223 9.29991 5.5774 11.786C5.41644 11.9242 5.21121 12.0002 4.99901 12C4.78681 11.9998 4.58172 11.9235 4.42099 11.785L4.22952 11.6188C1.46285 9.19759 0.0612793 6.97899 0.0612793 4.93868C0.0612793 3.62886 0.581603 2.37269 1.50778 1.44651C2.43397 0.520324 3.69014 0 4.99996 0ZM4.99996 3.03919C4.49618 3.03919 4.01304 3.23931 3.65681 3.59554C3.30059 3.95176 3.10047 4.4349 3.10047 4.93868C3.10047 5.44245 3.30059 5.9256 3.65681 6.28182C4.01304 6.63805 4.49618 6.83817 4.99996 6.83817C5.50374 6.83817 5.98688 6.63805 6.3431 6.28182C6.69933 5.9256 6.89945 5.44245 6.89945 4.93868C6.89945 4.4349 6.69933 3.95176 6.3431 3.59554C5.98688 3.23931 5.50374 3.03919 4.99996 3.03919Z" fill="#919191" fill-opacity="0.32"/>
          </svg> ${arg.event.extendedProps.description}`;

          const arrayOfDomNodes = [title, description];

          return { domNodes: arrayOfDomNodes };
        }}
      />
    </div>
  );
};

export default Calender;
