import React, { useState, useEffect } from "react";
import Image from "next/image";
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
        const { data: likeData, error: likeError } = await supabase
          .from("Interests")
          .select("*")
          .eq("user_id", currentUser.id)
          .eq("post_id", postId)
          .single();

        if (likeData) {
          setLiked(true);
        }
        if (likeError) {
          console.error("Error checking like status:", likeError);
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
      const { error } = await supabase.from("Interests").insert({
        user_id: currentUser.id,
        post_id: postId,
        category,
      });
      if (error) {
        console.error("Error liking post:", error);
      } else {
        setLiked(true);
      }
    } else {
      const { error } = await supabase.from("Interests").delete().eq("user_id", currentUser.id).eq("post_id", postId);
      if (error) {
        console.error("Error unliking post:", error);
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
