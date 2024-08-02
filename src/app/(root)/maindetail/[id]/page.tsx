"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import DOMPurify from "dompurify";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";

const supabase = createClient();

const MainDetailPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop() as string;
  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      if (id) {
        const { data: postData, error: postError } = await supabase
          .from("Posts")
          .select("*, user:user_id(profile_image_url, nickname, job_title, experience)")
          .eq("post_id", id)
          .single();

        if (postError) {
          console.error("Error fetching post:", postError);
          setLoading(false);
          return;
        }

        setPost(postData);

        const { data: currentUserData, error: currentUserError } = await supabase.auth.getUser();
        if (currentUserError) {
          console.error("Error fetching current user:", currentUserError);
        } else {
          setCurrentUser(currentUserData?.user);
          const { data: likeData, error: likeError } = await supabase
            .from("Interests")
            .select("*")
            .eq("user_id", currentUserData?.user?.id)
            .eq("post_id", id)
            .single();

          if (likeData) {
            setLiked(true);
          }
          if (likeError) {
            console.error("Error checking like status:", likeError);
          }
        }

        setLoading(false);
      }
    };

    fetchPostAndUser();
  }, [id]);

  const handleLike = async () => {
    if (!currentUser) {
      toast.error("로그인이 필요합니다!");
      return;
    }

    if (!liked) {
      const { error } = await supabase.from("Interests").insert({
        user_id: currentUser.id,
        post_id: id,
        category: post.category,
      });
      if (error) {
        console.error("Error liking post:", error);
        toast.error("좋아요를 추가하는 데 실패했습니다.");
      } else {
        setLiked(true);
        toast.success("좋아요를 눌렀습니다!");
      }
    } else {
      const { error } = await supabase.from("Interests").delete().eq("user_id", currentUser.id).eq("post_id", id);
      if (error) {
        console.error("Error unliking post:", error);
        toast.error("좋아요를 취소하는 데 실패했습니다.");
      } else {
        setLiked(false);
        toast.success("좋아요를 취소했습니다!");
      }
    }
  };

  const handleDelete = async () => {
    if (!currentUser || currentUser.id !== post.user_id) {
      toast.error("본인의 글만 삭제할 수 있습니다");
      return;
    }

    const { error } = await supabase.from("Posts").delete().eq("post_id", id);
    if (error) {
      toast.error("게시물 삭제에 실패했습니다.");
    } else {
      toast.success("게시물이 삭제되었습니다.");
      router.push("/");
    }
  };

  const confirmDelete = () => {
    toast(
      <div>
        <p>정말 삭제하시겠습니까?</p>
        <button
          onClick={() => {
            handleDelete();
            toast.dismiss();
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          삭제
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
        >
          취소
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      },
    );
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>글 없음</div>;

  const cleanContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "h1", "h2", "h3", "p", "span", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "target", "style", "class"],
  });

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL이 클립보드에 복사되었습니다!");
      })
      .catch(() => {
        toast.error("URL 복사에 실패했습니다.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex items-center space-x-4">
          <button type="button" onClick={handleShare} className="flex items-center">
            <Image src="/Main/share_button.png" alt="공유하기" width={24} height={24} />
          </button>
          <button type="button" onClick={handleLike} className="flex items-center">
            <Image
              src={liked ? "/Main/liked_button.png" : "/Main/unliked_button.png"}
              alt="좋아요"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
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
      {currentUser?.id === post.user_id && (
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push(`/post/${id}`)}
          >
            수정
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={confirmDelete}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default MainDetailPage;
