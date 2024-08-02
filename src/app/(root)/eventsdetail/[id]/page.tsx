"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient();

const EventDetailPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const eventId = pathname.split("/").pop() as string;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        const { data: eventData, error: eventError } = await supabase
          .from("IT_Events")
          .select("*")
          .eq("event_id", eventId)
          .single();

        if (eventError) {
          console.error("Error fetching event:", eventError);
          setLoading(false);
          return;
        }

        setEvent(eventData);

        const { data: currentUserData, error: currentUserError } = await supabase.auth.getUser();
        if (currentUserError) {
          console.error("Error fetching current user:", currentUserError);
        } else {
          setCurrentUser(currentUserData?.user);

          const { data: likeData, error: likeError } = await supabase
            .from("IT_Interests")
            .select("*")
            .eq("user_id", currentUserData?.user?.id)
            .eq("event_id", eventId)
            .single();

          if (likeData) {
            setLiked(true);
          }
          if (likeError) {
            console.error("Error checking like status:", likeError);
          }
        }

        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleLike = async () => {
    if (!currentUser) {
      toast.error("로그인이 필요합니다!");
      return;
    }

    if (!liked) {
      const { error } = await supabase.from("IT_Interests").insert({
        user_id: currentUser.id,
        event_id: eventId,
      });
      if (error) {
        console.error("Error liking event:", error);
        toast.error("좋아요를 추가하는 데 실패했습니다.");
      } else {
        setLiked(true);
        toast.success("좋아요를 눌렀습니다!");
      }
    } else {
      const { error } = await supabase
        .from("IT_Interests")
        .delete()
        .eq("user_id", currentUser.id)
        .eq("event_id", eventId);
      if (error) {
        console.error("Error unliking event:", error);
        toast.error("좋아요를 취소하는 데 실패했습니다.");
      } else {
        setLiked(false);
        toast.success("좋아요를 취소했습니다!");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
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
      <div className="flex items-center mt-4">
        <button type="button" onClick={handleLike} className="flex items-center">
          <Image
            src={liked ? "/Main/liked_button.png" : "/Main/unliked_button.png"}
            alt="좋아요"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
