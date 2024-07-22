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
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>{post.category}</p>
      <p>기술 스택: {post.tech_stack}</p>
      <p>모집 포지션: {post.target_position}</p>
      <p>
        마감일: {setDeadlines}(D-{daysLeft})
      </p>
      <p>위치: {post.location}</p>
      <p>총 인원: {post.total_members}</p>
      <p>모집 인원: {post.recruitments}</p>
      <p>필요 스택: {post.tags}</p>
      <span>깃 or 오픈톡: </span>
      {post.personal_link ? (
        <a href={post.personal_link} target="_blank" rel="noopener noreferrer">
          {post.personal_link}
        </a>
      ) : (
        <span>링크 없음</span>
      )}
    </div>
  );
};

export default PostCard;
