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

const detectMobileDevice = () => {
  const mobileWidth = 1068;

  return innerWidth <= mobileWidth;
}; // UserAgent 이용해야할지 ?

const Calender: NextPage = () => {
  const calenderRef = useRef<FullCalendar | null>(null); // 캘린더 객체 내부의 메서드를 사용하기 위해 정의함, | null 인 이유는 렌더링 이전에는 null 인 상태기 때문에 안정성을 위해 추가.
  const [isGrid, setIsGrid] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const isMobileDevice = detectMobileDevice();
    if (isMobileDevice) {
      setIsMobileDevice(isMobileDevice);
    }
  }, []);

  const getEvents = async () => {
    const response = await fetch("/api/events");

    if (response.ok) {
      const { data } = await response.json(); // 캘린더에 표기하기 위해 가져온 행사 일정의 날짜 형식을 바꿔줘야 할 수도 있음. start, end => yyyy-mm-dd 로만 바꾸면 될 듯

      const events = data.map((event: Tables<"IT_Events">) => ({
        title: event.title,
        start: dayjs(event.date_start).format("YYYY-MM-DD"), // yyyy-mm-dd 로 바꿔줘야함
        end: dayjs(event.date_done).format("YYYY-MM-DD"),
        description: event.location,
      }));

      return events;
    } else {
      throw new Error("Something went wrong while fetching events");
    }
  };

  let {
    data: IT_Events,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["IT_Events"],
    queryFn: getEvents,
  });

  useEffect(() => {
    // FullCalendar가 렌더링된 후에 실행됩니다.
    if (calenderRef) {
      const aElements = document.querySelectorAll(".fc-daygrid-day-bottom");
      console.log(aElements);
      aElements.forEach((aEl) => {
        // 예를 들어, 클릭 이벤트를 추가할 수 있습니다.
        aEl.addEventListener("click", () => {
          console.log("Anchor clicked!");
        });
      });
    }
  }, [calenderRef]);

  return (
    <div className="custom_calender">
      <h4 className="mb-4">HOT한 IT 행사 놓치지 마세요</h4>
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
        initialView={!isMobileDevice ? "dayGridMonth" : "listMonth"}
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
        fixedWeekCount={false}
        moreLinkContent={(arg) => {
          return arg.shortText;
        }}
        // List View 옵션
        allDayText=""
        displayEventTime={false}
        eventDisplay="list-item"
        // 장소 정보 표시
        eventContent={(arg) => {
          const title = document.createElement("div");
          title.classList.add("fc-event-title");
          title.innerHTML = arg.event.title;

          const description = document.createElement("div");
          description.classList.add("fc-event-description");
          description.innerHTML = arg.event.extendedProps.description;

          const arrayOfDomNodes = [title, description];

          return { domNodes: arrayOfDomNodes };
        }}
      />
    </div>
  );
};

export default Calender;
