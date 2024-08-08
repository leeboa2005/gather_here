"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LikeButton from "@/components/EventsDetail/ITLikeButton";
import ShareButton from "@/components/MainDetail/ShareButton"; // ShareButton을 적절한 경로에서 import합니다.
import dynamic from "next/dynamic";
import animationData from "@/assets/loadingBar.json";

const LottiAnimation = dynamic(() => import("@/components/Common/Loading/LottiAnimation"), {
  ssr: false,
});

const supabase = createClient();

const EventDetailPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const eventId = pathname.split("/").pop() as string;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

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
        }

        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL이 클립보드에 복사되었습니다!");
      })
      .catch(() => {
        toast.error("URL 복사에 실패했습니다.");
      });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-background">
        <LottiAnimation animationData={animationData} size="200px" />
      </div>
    );
  if (!event) return <div>Event not found.</div>;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateDeadlineBadge = (deadline: string): string => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? "D-day" : `D-${diffDays}`;
  };

  const deadlineBadge = calculateDeadlineBadge(event.date_done);

  return (
    <>
      <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s bg-background text-fontWhite rounded-lg shadow-md">
        <button
          onClick={() => router.push("/events")}
          className="text-labelNeutral mt-5 mb-4 flex items-center space-x-2"
        >
          <Image src="/Common/Icons/back.png" alt="Back" width={16} height={16} />
          <span>목록으로 돌아갈게요</span>
        </button>
      </div>
      <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s p-4 bg-fillStrong text-fontWhite rounded-lg shadow-md">
        <ToastContainer />
        <h1 className="text-title font-title mb-4 p-2">{event.title}</h1>
        <div className="flex justify-end items-center mb-4 mr-4 space-x-2">
          <ShareButton />
          <LikeButton eventId={eventId} currentUser={currentUser} />
        </div>
        <div className="bg-fillStrong p-4 rounded-lg mb-4">
          {event.img_url && (
            <img src={event.img_url} alt={event.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
          )}
          <div className="flex flex-wrap">
            <div className="w-1/2 p-3">
              <p className="mb-3">
                <strong className="text-labelNeutral">분류</strong> <span className="ml-5">{event.category}</span>
              </p>
              <p className="mb-3">
                <strong className="text-labelNeutral">주최</strong> <span className="ml-5">{event.host}</span>
              </p>
              <p className="mb-3">
                <strong className="text-labelNeutral">일시</strong>{" "}
                <span className="ml-5">
                  {event.date_start === event.date_done
                    ? formatDate(event.date_start)
                    : `${formatDate(event.date_start)} - ${formatDate(event.date_done)}`}
                  <span className="ml-2 text-sm bg-fillLight text-primary rounded-full px-3 py-1.5">
                    {deadlineBadge}
                  </span>
                </span>
              </p>
              <p className="mb-3">
                <strong className="text-labelNeutral">장소</strong> <span className="ml-5">{event.location}</span>
              </p>
            </div>
            <div className="w-1/2 p-3 flex flex-col justify-between">
              <div>
                <p className="mb-3">
                  <strong className="text-labelNeutral">신청 기간</strong>{" "}
                  <span className="ml-4">
                    {formatDate(event.apply_start)} - {formatDate(event.apply_done)}
                  </span>
                </p>
                <p className="mb-3 flex items-start">
                  <strong className="text-labelNeutral">입장 정보</strong>
                  <span className="ml-5 flex flex-col">
                    <span>일반 구매자 - {event.price?.regular || "N/A"}원</span>
                    <span>사전 구매자 - {event.price?.student || "N/A"}원</span>
                  </span>
                </p>
              </div>
              <a href={event.link_url} target="_blank" rel="noopener noreferrer" className="self-end ml-5">
                <Image src="/Detail/application_button.png" alt="신청하러 가기" width={120} height={30} />
              </a>
            </div>
          </div>
        </div>
        <hr className="border-fillNeutral mb-4" />
        <h2 className="text-lg text-labelAssistive font-semibold mb-5">행사 상세</h2>
        <div className="bg-fillNormal p-4 rounded-lg shadow-md">
          <p>{event.description}</p>
        </div>
      </div>
    </>
  );
};

export default EventDetailPage;
