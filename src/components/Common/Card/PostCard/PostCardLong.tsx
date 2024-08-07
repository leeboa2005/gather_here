import { PostWithUser } from "@/types/posts/Post.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import arrow from "@/../public/Main/arrow.png";
import interest_basic from "@/../public/Main/interest_basic.png";
import interest_active from "@/../public/Main/interest_active.png";
import Link from "next/link";
import { useUser } from "@/provider/UserContextProvider";
import LikeButton from "@/components/MainDetail/LikeButton";
import dayjs from "dayjs";

interface PostCardProps {
  post: PostWithUser;
}

const PostCardLong: React.FC<PostCardProps> = ({ post }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [daysLeft, setDaysLeft] = useState<string>();

  useEffect(() => {
    setIsMounted(true);

    const deadlineDate = new Date(post.deadline);
    const daysLeft = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const displayDaysLeft = daysLeft === 0 ? "D-day" : `D-${daysLeft}`;

    setDaysLeft(displayDaysLeft);
  }, []);

  let cleanContent = post.content;
  if (typeof window !== "undefined" && isMounted) {
    const DOMPurify = require("dompurify");
    cleanContent = DOMPurify.sanitize(post.content, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  }

  const getProfileImageUrl = (url: string) => `${url}?${new Date().getTime()}`;

  const jobTitleClassMap: { [key: string]: string } = {
    프론트엔드: "text-primary",
    IOS: "text-accentPurple",
    안드로이드: "text-accentRed",
    PM: "text-accentColumbia",
    기획자: "text-accentPink",
    마케팅: "text-accentYellow",
    백엔드: "text-accentOrange",
    디자이너: "text-accentMaya",
    데브옵스: "text-accentMint",
  };

  return (
    <div className="w-auto p-5 bg-fillStrong rounded-2xl m-2 mb-4">
      <div className="flex justify-between items-center"></div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm bg-fillLight text-primary rounded-full px-3 py-1.5">{daysLeft}</span>
          <span className="text-sm text-labelNormal ml-2">~{dayjs(post.deadline).format("YYYY-MM-DD")}</span>
        </div>
        {/* <LikeButton postId={post.post_id} currentUser={currentUser} category={post.category} /> */}
      </div>
      <Link href={`/maindetail/${post.post_id}`}>
        <h2 className="text-left text-subtitle mt-3 font-base text-labelStrong truncate w-3/4">{post.title}</h2>
        <p className="mt-2 mb-4 h-11 overflow-hidden text-left font-thin line-clamp-2 text-labelNeutral">
          {cleanContent}
        </p>
        <div className="flex items-center mb-4">
          {post.user?.profile_image_url && (
            <div className="relative w-7 h-7 mr-2">
              <Image
                src={getProfileImageUrl(post.user.profile_image_url)}
                alt="User profile"
                fill
                sizes="40px"
                className="rounded-md object-cover"
              />
            </div>
          )}
          <p className="text-sm text-gray-500">{post.user?.nickname}</p>
        </div>

        <div className="text-base flex items-center justify-between bg-fillNormal p-3 rounded-lg truncate">
          <div className="flex-1 text-left truncate">
            {post.target_position.map((position, index) => (
              <span key={index} className={`${jobTitleClassMap[position] || "text-default"}`}>
                {position}
                {index < post.target_position.length - 1 && <span className="mx-2 text-labelAssistive">|</span>}
              </span>
            ))}
          </div>
          <div className="flex items-center flex-none">
            <div className={`mr-2 ${jobTitleClassMap[post.target_position[0]] || "text-default"}`}>
              {post.recruitments}명
            </div>
            <div className="flex items-center">
              <Image
                src="/assets/cardarrow.svg"
                alt="Puzzle Icon"
                width={10}
                height={10}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCardLong;
