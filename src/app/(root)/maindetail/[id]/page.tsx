"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import DOMPurify from "dompurify";

const supabase = createClient();

const MainDetailPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      if (id) {
        const { data: postData, error: postError } = await supabase
          .from("Posts")
          .select("*")
          .eq("post_id", id)
          .single();

        if (postError) {
          console.error("Error fetching post:", postError);
          setLoading(false);
          return;
        }

        setPost(postData);

        const { data: userData, error: userError } = await supabase
          .from("Users")
          .select("profile_image_url, nickname, job_title, experience")
          .eq("user_id", postData.user_id)
          .single();

        if (userError) {
          console.error("Error fetching user:", userError);
        } else {
          setUser(userData);
        }

        setLoading(false);
      }
    };

    fetchPostAndUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>글 없음</div>;

  const cleanContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "h1", "h2", "h3", "p"],
    ALLOWED_ATTR: ["href", "target"],
  });

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="flex mb-4">
        <div className="w-1/4 flex flex-col items-center">
          {user?.profile_image_url && (
            <img src={user.profile_image_url} alt={user.nickname} className="w-20 h-20 rounded-full mb-2" />
          )}
          <h2 className="text-lg font-semibold">{user?.nickname}</h2>
          <p className="text-sm">{user?.job_title}</p>
          <p className="text-sm">{user?.experience}</p>
        </div>
        <div className="w-3/4 flex flex-wrap bg-gray-100 p-4 rounded-lg ml-4">
          <div className="w-1/2 p-2">
            <p>
              <strong>분류</strong> {post.category}
            </p>
            <p>
              <strong>지역</strong> {post.location}
            </p>
            <p>
              <strong>기간</strong> {post.duration}개월
            </p>
            <p>
              <strong>총 인원</strong> {post.total_members}명
            </p>
            <p>
              <strong>연락 방법</strong> {post.personal_link}
            </p>
          </div>
          <div className="w-1/2 p-2">
            <p>
              <strong>모집 대상</strong> {post.target_position.join(", ")}
            </p>
            <p>
              <strong>모집 인원</strong> {post.recruitments}명
            </p>
            <p>
              <strong>기술 스택</strong> {post.tech_stack}
            </p>
            <p>
              <strong>마감일</strong> {new Date(post.deadline).toLocaleDateString()}
            </p>
            <p>
              <strong>장소</strong> {post.place}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">내용</h2>
        <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
      </div>
    </div>
  );
};

export default MainDetailPage;
