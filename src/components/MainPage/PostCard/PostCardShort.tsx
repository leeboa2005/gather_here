import React from "react";
import { Post } from "@/types/posts/Post.type";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const deadlineDate = new Date(post.deadline);
  const daysLeft = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const setDeadlines = deadlineDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="p-8 m-5 text-center bg-slate-100 shadow-md rounded-2xl">
      <p className="text-sm text-gray-500">작성자 {post.user_id}</p>
      <h2 className="text-left text-xl font-bold truncate">{post.title}</h2>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm bg-gray-200 rounded-full px-2 py-1">D-{daysLeft}</p>
        <p className="text-sm text-gray-500">마감일 : {setDeadlines}</p>
      </div>
      <p className="mt-5 mb-5 truncate">{post.content}</p>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          모집 : {post.target_position} / 인원 : {post.recruitments}
        </p>
        <p className="text-sm mt-2 text-gray-500">기술 스택: {post.tech_stack}</p>
      </div>
    </div>
  );
};

export default PostCard;
