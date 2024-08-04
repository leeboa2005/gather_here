"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { toast } from "react-toastify";

const supabase = createClient();

interface LikeButtonProps {
  eventId: string;
  currentUser: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({ eventId, currentUser }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (currentUser) {
        const { data: likeData, error: likeError } = await supabase
          .from("IT_Interests")
          .select("*")
          .eq("user_id", currentUser.id)
          .eq("event_id", eventId)
          .single();

        if (likeData) {
          setLiked(true);
        }
        if (likeError) {
          console.error("Error checking like status:", likeError);
        }
      }
    };

    fetchLikeStatus();
  }, [currentUser, eventId]);

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
      } else {
        setLiked(true);
      }
    } else {
      const { error } = await supabase
        .from("IT_Interests")
        .delete()
        .eq("user_id", currentUser.id)
        .eq("event_id", eventId);
      if (error) {
        console.error("Error unliking event:", error);
      } else {
        setLiked(false);
      }
    }
  };

  return (
    <button type="button" onClick={handleLike} className="flex items-center">
      <Image
        src={liked ? "/Main/interest_active.png" : "/Main/interest_basic.png"}
        alt="좋아요"
        width={16}
        height={16}
      />
    </button>
  );
};

export default LikeButton;
