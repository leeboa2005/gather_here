import React, { useState } from "react";
import { PostWithUser } from "@/types/posts/Post.type";
import Image from "next/image";
import interest_basic from "@/../public/Main/interest_basic.png";
import interest_active from "@/../public/Main/interest_active.png";
import arrow from "@/../public/Main/arrow.png";
import Link from "next/link";

interface PostCardProps {
  post: PostWithUser;
}

const PostCardShort: React.FC<PostCardProps> = ({ post }) => {
  const [isActive, setIsActive] = useState(false);
  const deadlineDate = new Date(post.deadline);
  const daysLeft = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const setDeadlines = deadlineDate.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  const handleInterestClick = () => {
    setIsActive(!isActive);
  };

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
    <div className="w-full h-full max-w-container-l m:max-w-container-m s:max-w-container-s">
      <div className="p-5 h-64 m-2 text-center bg-fillStrong rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-baseS bg-fillLight text-primary rounded-full px-3 py-1.5">D-{daysLeft}</span>
            <span className="text-baseS text-labelNormal ml-2">~{setDeadlines}</span>
          </div>
          <div onClick={handleInterestClick} className="cursor-pointer">
            <Image src={isActive ? interest_active : interest_basic} alt="interest_basic" width={15} />
          </div>
        </div>
        <h2 className="text-left text-subtitle font-base truncate mt-3 text-labelStrong">{post.title}</h2>
        <p className="mt-2 mb-4 h-11 overflow-hidden text-left font-thin line-clamp-2 text-labelNeutral">
          {post.content}
        </p>{" "}
        <div className="mt-1">
          <div className="flex items-center mb-4">
            {post.user?.profile_image_url && (
              <div className="relative w-7 h-7 mr-2">
                <Image
                  src={post.user.profile_image_url}
                  alt="User profile"
                  fill
                  sizes="40px"
                  className="rounded-md object-cover"
                />
              </div>
            )}
            <p className="text-sm text-labelNeutral truncate">{post.user?.nickname}</p>
          </div>
          <Link href={`/maindetail/${post.post_id}`}>
            <div className="text-base flex items-center justify-between bg-fillNormal p-3 rounded-lg truncate">
              <div className="flex-1 text-left truncate">
                {post.target_position.length > 0 && (
                  <>
                    <span className={`${jobTitleClassMap[post.target_position[0]] || "text-default"}`}>
                      {post.target_position[0]}
                    </span>
                    {post.target_position.length > 1 && (
                      <span className={`${jobTitleClassMap[post.target_position[0]] || "text-default"}`}>
                        +{post.target_position.length - 1}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center flex-none">
                <div className="mr-2">{post.recruitments}명</div>
                <Image src={arrow} alt="interest_basic" width={11} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCardShort;
