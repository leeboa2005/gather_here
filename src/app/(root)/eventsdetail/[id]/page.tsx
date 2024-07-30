"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const EventDetailPage = () => {
  const pathname = usePathname();
  const eventId = pathname.split("/").pop();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        const { data, error } = await supabase.from("IT_Events").select("*").eq("event_id", eventId).single();

        if (error) {
          console.error("Error fetching event:", error);
        } else {
          setEvent(data);
        }
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        {event.img_url && (
          <img src={event.img_url} alt={event.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>
              <strong>주최:</strong> {event.host}
            </p>
            <p>
              <strong>카테고리:</strong> {event.category}
            </p>
            <p>
              <strong>일시:</strong> {new Date(event.date_start).toLocaleString()} -{" "}
              {new Date(event.date_done).toLocaleString()}
            </p>
            <p>
              <strong>장소:</strong> {event.location}
            </p>
          </div>
          <div>
            <p>
              <strong>신청 기간:</strong> {new Date(event.apply_start).toLocaleString()} -{" "}
              {new Date(event.apply_done).toLocaleString()}
            </p>
            <p>
              <strong>가격:</strong>
            </p>
            <ul className="ml-4">
              <li>일반 구매자: {event.price?.regular || "N/A"}원</li>
              <li>강의 구매자: {event.price?.student || "N/A"}원</li>
            </ul>
          </div>
        </div>
      </div>
      <a
        href={event.link_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-blue-500 text-white text-center py-2 rounded-lg mb-4"
      >
        신청하러 가기
      </a>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">행사 상세</h2>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetailPage;
