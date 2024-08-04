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
import LikeButton from "@/components/MainDetail/LikeButton";
import ShareButton from "@/components/MainDetail/ShareButton";

const supabase = createClient();

const MainDetailPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop() as string;
  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showOptions, setShowOptions] = useState(false);

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

        const { data: currentUserData, error: currentUserError } = await supabase.auth.getUser();
        if (currentUserError) {
          console.error("Error fetching current user:", currentUserError);
        } else {
          setCurrentUser(currentUserData?.user);
        }

        setLoading(false);
      }
    };

    fetchPostAndUser();
  }, [id]);

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
      <div className="bg-fillAlternative p-4 rounded-lg shadow-md text-fontWhite">
        <p className="text-xl font-semibold mb-2">정말 삭제하시겠어요?</p>
        <p className="text-sm text-labelNeutral mb-4">삭제하면 다시 복구할 수 없어요.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            취소할래요
          </button>
          <button
            onClick={() => {
              handleDelete();
              toast.dismiss();
            }}
            className="bg-primary hover:bg-primaryStrong text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            삭제할래요
          </button>
        </div>
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

  const handleMoreOptions = () => {
    setShowOptions(!showOptions);
  };

  const timeAgo = (timestamp: string): string => {
    const now: Date = new Date();
    const postDate: Date = new Date(timestamp);
    const diff = now.getTime() - postDate.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>글 없음</div>;

  const cleanContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "h1", "h2", "h3", "p", "span", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "target", "style", "class"],
  });

  return (
    <div className="max-w-4xl mx-auto p-4 bg-fillAlternative text-fontWhite rounded-lg shadow-md">
      <ToastContainer
        toastClassName={() =>
          "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-fillAlternative"
        }
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
      <button onClick={() => router.push("/")} className="text-labelNeutral mb-4 flex items-center space-x-2">
        <Image src="/Common/Icons/back.png" alt="Back" width={16} height={16} />
        <span>목록으로 돌아가기</span>
      </button>
      <div className="mb-4">
        <h1 className="text-title font-title">{post.title}</h1>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 p-2">
          <p>
            <strong>분류:</strong> {post.category}
          </p>
          <p>
            <strong>지역:</strong> {post.location}
          </p>
          <p>
            <strong>기간:</strong> {post.duration}개월
          </p>
          <p>
            <strong>총 인원:</strong> {post.total_members}명
          </p>
          <p>
            <strong>연락 방법:</strong> {post.personal_link}
          </p>
        </div>
        <div className="w-1/2 p-2">
          <p>
            <strong>모집 대상:</strong> {post.target_position.join(", ")}
          </p>
          <p>
            <strong>모집 인원:</strong> {post.recruitments}명
          </p>
          <p>
            <strong>기술 스택:</strong> {post.tech_stack}
          </p>
          <p>
            <strong>마감일:</strong> {new Date(post.deadline).toLocaleDateString()}
          </p>
          <p>
            <strong>장소:</strong> {post.place}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          {user?.profile_image_url && (
            <Image src={user.profile_image_url} alt={user.nickname} width={24} height={24} className="rounded-full" />
          )}
          <span className="text-base font-medium">{user?.nickname}</span>
          <span className="text-sm text-labelNeutral">{timeAgo(post.created_at)}</span>
        </div>
        <div className="flex items-center space-x-4">
          <ShareButton />
          <LikeButton postId={id} currentUser={currentUser} category={post.category} />
          <div className="relative">
            <button onClick={handleMoreOptions} className="flex items-center">
              <Image src="/Detail/edit-delete_button.png" alt="더보기" width={24} height={24} />
            </button>
            {showOptions && currentUser?.id === post.user_id && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push(`/post/${id}`)}
                >
                  수정하기
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={confirmDelete}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-fillLight p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">내용</h2>
        <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
      </div>
    </div>
  );
};

export default MainDetailPage;
