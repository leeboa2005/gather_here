"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./fullcalender.css";

const detectMobileDevice = () => {
  const mobileWidth = 1068;

  return window.innerWidth <= mobileWidth;
}; // UserAgent 이용해야할지 ?

const Calender: React.FC = () => {
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

      const events = data.map((event: any) => ({
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
    <FullCalendar
      // 큰 값으로 설정하면 더 작게 보임
      allDayText=""
      showNonCurrentDates={false}
      aspectRatio={2}
      plugins={[dayGridPlugin, listPlugin]}
      initialView={!isMobileDevice ? "dayGridMonth" : "list"}
      eventSources={[
        {
          // 이것을 이용해 카테고리별로 색깔을 다르게 할 수 있도록 하면 좋을 듯
          events: IT_Events,
          color: "black",
          textColor: "yellow",
        },
      ]}
      dayMaxEventRows={0}
      eventDisplay="list-item"
      headerToolbar={{
        /* start: "prev,next,today" */
        start: "prev",
        center: "title",
        end: "next",
        /* end: "dayGridMonth,listWeek" */
      }}
      titleFormat={function (date) {
        return date.date.year + "년 " + (date.date.month + 1) + "월";
      }}
      locale="ko"
    />
  );
};

export default Calender;
