import { Post } from "@/types/posts/Post.type";
import React from "react";

interface PostCardProps {
  post: Post;
}

const PostCardLong: React.FC<PostCardProps> = ({ post }) => {
  const deadlineDate = new Date(post.deadline);
  const daysLeft = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const setDeadlines = deadlineDate.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="w-auto p-7 bg-slate-100 shadow-md rounded-2xl m-2 mb-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">작성자 {post.user_id}</p>
      </div>
      <div className="flex justify-between">
        <h2 className="text-left text-lg font-bold truncate w-3/4">{post.title}</h2>
        <div className="flex">
          <p className="text-sm w-auto bg-gray-200 rounded-full px-2 py-1 flex-shrink-0">{post.category}</p>
          <p className="text-sm w-auto bg-gray-200 rounded-full px-2 py-1 flex-shrink-0">D-{daysLeft}</p>
          <p className="text-sm text-gray-500 hidden md:block flex-shrink-0">마감일 : {setDeadlines}</p>
        </div>
      </div>
      <p className="mt-2 mb-4 h-11 overflow-hidden text-left font-thin line-clamp-2">{post.content}</p>
      <div className="flex flex-wrap items-center mt-4">
        <p className="text-sm text-gray-500 mr-4">
          모집 : {post.target_position} / 인원 : {post.recruitments}
        </p>
        <p className="text-sm text-gray-500">기술 스택: {post.tech_stack}</p>
      </div>
    </div>
  );
};

export default PostCardLong;
