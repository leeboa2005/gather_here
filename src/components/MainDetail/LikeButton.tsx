"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface LikeButtonProps {
  postId: string;
  currentUser: any;
  category: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, currentUser, category }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (currentUser) {
        const {
          data: likeData,
          error: likeError,
          status,
        } = await supabase.from("Interests").select("*").eq("user_id", currentUser.id).eq("post_id", postId).single();

        if (likeError && status !== 406) {
          console.error("Error checking like status:", likeError.message);
        } else if (likeData) {
          setLiked(true);
        } else if (status === 406) {
          console.error("Not acceptable:", likeError?.message);
        }
      }
    };

    checkLikeStatus();
  }, [currentUser, postId]);

  const handleLike = async () => {
    if (!currentUser) {
      toast.error("로그인이 필요합니다!");
      return;
    }

    if (!liked) {
      const { error, status } = await supabase.from("Interests").insert({
        user_id: currentUser.id,
        post_id: postId,
        category,
      });
      if (error && status !== 406) {
        console.error("Error liking post:", error.message);
      } else if (status === 406) {
        console.error("Not acceptable:", error?.message);
      } else {
        setLiked(true);
      }
    } else {
      const { error, status } = await supabase
        .from("Interests")
        .delete()
        .eq("user_id", currentUser.id)
        .eq("post_id", postId);
      if (error && status !== 406) {
        console.error("Error unliking post:", error.message);
      } else if (status === 406) {
        console.error("Not acceptable:", error?.message);
      } else {
        setLiked(false);
      }
    }
  };

  return (
    <button type="button" onClick={handleLike} className="flex items-center">
      <svg width="24" height="24" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.2867 0H4.71526C2.04384 0 0 2.08 0 4.8V30.4C0 30.72 0 30.88 0.15812 31.2C0.629548 32 1.57241 32.16 2.35812 31.84L11.0005 26.72L19.6433 31.84C19.9581 32 20.1153 32 20.4291 32C21.372 32 22.0005 31.36 22.0005 30.4V4.8C22.0005 2.08 19.9581 0 17.2867 0Z"
          fill={liked ? "#C3E88D" : "#5E5E5E"}
        />
      </svg>
    </button>
  );
};

export default LikeButton;
