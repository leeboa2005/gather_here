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
            className="bg-fillLight hover:bg-fillNormal text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            취소할래요
          </button>
          <button
            onClick={() => {
              handleDelete();
              toast.dismiss();
            }}
            className="bg-primary hover:bg-primaryStrong text-labelAssistive font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    <>
      <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s bg-background text-fontWhite rounded-lg shadow-md">
        <button onClick={() => router.push("/")} className="text-labelNeutral mt-2 mb-4 flex items-center space-x-2">
          <Image src="/Common/Icons/back.png" alt="Back" width={16} height={16} />
          <span>목록으로 돌아갈게요</span>
        </button>
      </div>
      <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s p-4 bg-fillAlternative text-fontWhite rounded-lg shadow-md">
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
        <div className="mb-4">
          <h1 className="text-title font-title">{post.title}</h1>
        </div>
        <div className="flex items-center justify-between mb-4">
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
                <Image src="/Detail/edit-delete_button.png" alt="더보기" width={28} height={28} />
              </button>
              {showOptions && currentUser?.id === post.user_id && (
                <div className="absolute right-0 mt-2 w-48 bg-fillStrong rounded-lg shadow-lg py-2">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-fillAssistive flex items-center"
                    onClick={() => router.push(`/post/${id}`)}
                  >
                    <Image src="/Detail/edit_button.png" alt="수정하기" width={16} height={16} className="mr-2" />
                    수정하기
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-fillAssistive flex items-center"
                    onClick={confirmDelete}
                  >
                    <Image src="/Detail/delete_button.png" alt="삭제하기" width={16} height={16} className="mr-2" />
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="border-fillNeutral mb-4" />
        <div>
          <h2 className="text-lg text-labelAssistive font-semibold mb-2">모집 정보</h2>
        </div>
        <div className="flex mb-4 flex-wrap">
          <div className="w-1/2 p-3">
            <p className="mb-3">
              <strong className="text-labelNeutral">분류</strong> <span className="ml-5">{post.category}</span>
            </p>
            <p className="mb-3">
              <strong className="text-labelNeutral">지역</strong> <span className="ml-5">{post.location}</span>
            </p>
            <p className="mb-3">
              <strong className="text-labelNeutral">기간</strong> <span className="ml-5">{post.duration}개월</span>
            </p>
            <p className="mb-3">
              <strong className="text-labelNeutral">총 인원</strong>{" "}
              <span className="ml-5">{post.total_members}명</span>
            </p>
            <p className="mb-3">
              <strong className="text-labelNeutral">지원 방법</strong>{" "}
              <span className="ml-5">{post.personal_link}</span>
            </p>
          </div>
          <div className="w-1/2 p-3">
            <p className="mb-3">
              <strong className="text-labelNeutral">모집 대상</strong>{" "}
              <span className="ml-5">{post.target_position.join(", ")}</span>
            </p>
            <p className="mb-3">
              <strong className="text-labelNeutral">모집 인원</strong>{" "}
              <span className="ml-5">{post.recruitments}명</span>
            </p>
            <p className="mb-3">
              <strong className="text-labelNeutral">기술 스택</strong> <span className="ml-5">{post.tech_stack}</span>
            </p>
            <p className="mb-3">
              <strong className="text-labelNeutral">마감일</strong>{" "}
              <span className="ml-5">{new Date(post.deadline).toLocaleDateString()}</span>
            </p>
            <p className="mb-3">
              <strong className="text-labelNeutral">장소</strong> <span className="ml-5">{post.place}</span>
            </p>
          </div>
        </div>
        <hr className="border-fillNeutral mb-4" />
        <div>
          <h2 className="text-lg text-labelAssistive font-semibold mb-5">모집 내용</h2>
        </div>
        <div className="bg-fillLight p-4 rounded-lg shadow-md">
          <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
        </div>
      </div>
      <style jsx>{`
        @media only screen and (max-width: 1068px) {
          .max-w-container-l {
            max-width: 744px;
          }
        }
        @media only screen and (max-width: 768px) {
          .max-w-container-m {
            max-width: 335px;
          }
          .w-1/2 {
            width: 100%;
          }
          p span {
            display: block;
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
};

export default MainDetailPage;
