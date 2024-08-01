"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import "./fullcalender.css";

type EventsType = {
  title: string;
  date_start: string;
  date_done: string;
};

const detectMobileDevice = () => {
  const mobileWidth = 1068;

  return innerWidth <= mobileWidth;
}; // UserAgent 이용해야할지 ?

const Calender: React.FC = () => {
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

      const events = data.map((event: EventsType) => ({
        title: event.title,
        start: dayjs(event.date_start).format("YYYY-MM-DD"), // yyyy-mm-dd 로 바꿔줘야함
        end: dayjs(event.date_done).format("YYYY-MM-DD"),
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

  if (isPending) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h4 className="mb-4">HOT한 IT 행사 놓치지 마세요</h4>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        aspectRatio={0.65} // 큰 값으로 설정하면 더 작게 보임
        ref={calenderRef}
        customButtons={{
          viewChanger: {
            click() {
              if (isGrid) {
                calenderRef.current?.getApi().changeView("list");
                setIsGrid(false);
              } else {
                calenderRef.current?.getApi().changeView("dayGridMonth");
                setIsGrid(true);
              }
            },
          },
        }}
        // dateClick={(info) => {
        //   console.log(info);
        //   alert("Current view: " + info.view);
        // }}
        firstDay={1}
        initialView={!isMobileDevice ? "dayGridMonth" : "list"}
        eventSources={[
          {
            events: IT_Events,
            color: "black",
            textColor: "yellow",
          },
        ]}
        dayMaxEventRows={0}
        dayCellContent={(cellContent) => {
          return cellContent.dayNumberText.replace("일", "");
        }}
        moreLinkContent={(asdf) => {
          return asdf.shortText;
        }}
        eventDisplay="list-item"
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
          return date.date.year + "년 " + (date.date.month + 1) + "월";
        }}
        locale="ko"
      />
    </>
  );
};

export default Calender;
