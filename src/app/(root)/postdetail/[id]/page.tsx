"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import DOMPurify from "dompurify";

const supabase = createClient();

const PostDetailPage = () => {
  const pathname = usePathname();
  const postId = pathname.split("/").pop();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const { data, error } = await supabase.from("Posts").select("*").eq("post_id", postId).single();

        if (error) {
          console.error("Error fetching post:", error);
        } else {
          setPost(data);
        }
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <div className="post-content">
        <p>방식: {post.place}</p>
        <p>인원: {post.total_members} 내외</p>
        <p>기간: {post.duration}개월</p>
        <p>지역: {post.location}</p>
        <p>이메일: {post.personal_link}</p>
        <p>모집 대상: {post.target_position.join(", ")}</p>
        <p>모집 인원: {post.recruitments}명</p>
        <p>마감일: {post.deadline}</p>
        <p>기술 스택: {post.tech_stack.join(", ")}</p>
      </div>
      모집 상세
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
    </div>
  );
};

export default PostDetailPage;
