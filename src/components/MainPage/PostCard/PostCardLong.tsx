import { Post } from "@/types/posts/Post.type";
import React from "react";

interface PostCardProps {
  post: Post;
}

const PostCardLong: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="w-auto p-7 bg-slate-100 shadow-md rounded-2xl m-2 mb-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">작성자 {post.user_id}</p>
      </div>
      <h2 className="text-left text-lg font-bold truncate">{post.title}</h2>
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
