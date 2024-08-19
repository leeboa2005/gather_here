"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import DOMPurify from "dompurify";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import LikeButton from "@/components/MainDetail/LikeButton";
import ShareButton from "@/components/MainDetail/ShareButton";
import CommonModal from "@/components/Common/Modal/CommonModal";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

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

  const handleMoreOptions = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

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

  const handleBackClick = () => {
    const previousPage = localStorage.getItem("previousPage");
    if (previousPage) {
      router.push(previousPage);
    } else {
      router.push("/all");
    }
  };

  const handleDelete = async () => {
    if (!currentUser || currentUser.id !== post.user_id) {
      alert("본인의 글만 삭제할 수 있습니다.");
      return;
    }

    const { error } = await supabase.from("Posts").delete().eq("post_id", id);
    if (error) {
    } else {
      router.push("/");
    }
  };

  if (!post) return <></>;

  const cleanContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "h1", "h2", "h3", "p", "span", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "target", "style", "class"],
  });

  const renderTechStackIcons = (techStack: string[]) => {
    return techStack.map((tech) => (
      <div key={tech} className="inline-flex items-center mr-1">
        <div className="flex items-center my-1 bg-fillNormal px-2.5 py-1 rounded-full">
          <div className="flex items-center">
            <Image
              src={`/Stacks/${tech}.svg`}
              alt={tech}
              width={20}
              height={20}
              className="mr-1"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
          <span className="text-baseS text-labelNeutral">{tech}</span>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="w-full mx-auto max-w-[672px] s:max-w-container-s bg-background text-fontWhite rounded-lg">
        <button
          onClick={() => router.push("/events")}
          className="text-labelNeutral mt-5 mb-4 flex items-center space-x-2 group"
        >
          <div className="relative">
            <Image
              src="/assets/back.svg"
              alt="목록으로 돌아가기"
              width={24}
              height={24}
              className="transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
          <span>목록으로 돌아갈게요</span>
        </button>
      </div>
      <div className="w-full mx-auto max-w-[672px] s:max-w-container-s p-5 bg-fillAlternative text-fontWhite rounded-lg">
        <div className="mb-4">
          <h1 className="text-title font-title">{post.title}</h1>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {user?.profile_image_url && (
              <Image
                src={user.profile_image_url ?? "/assets/header/user.svg"}
                alt={user.nickname}
                width={28}
                height={28}
                className="rounded-md object-cover w-[28px] h-[28px]"
              />
            )}
            <span className="text-base font-medium">{user?.nickname}</span>
            <span className="text-sm text-labelNeutral">{timeAgo(post.created_at)}</span>
          </div>
          <div className="flex items-center">
            <ShareButton />
            <LikeButton postId={id} currentUser={currentUser} category={post.category} />
            {currentUser?.id === post.user_id && (
              <div className="relative ml-2" ref={optionsRef}>
                <button onClick={handleMoreOptions} className="flex items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 4 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1"
                  >
                    <path
                      d="M2 17C2.26522 17 2.51957 16.8946 2.70711 16.7071C2.89464 16.5196 3 16.2652 3 16C3 15.7348 2.89464 15.4804 2.70711 15.2929C2.51957 15.1054 2.26522 15 2 15C1.73478 15 1.48043 15.1054 1.29289 15.2929C1.10536 15.4804 1 15.7348 1 16C1 16.2652 1.10536 16.5196 1.29289 16.7071C1.48043 16.8946 1.73478 17 2 17ZM2 10C2.26522 10 2.51957 9.89464 2.70711 9.70711C2.89464 9.51957 3 9.26522 3 9C3 8.73478 2.89464 8.48043 2.70711 8.29289C2.51957 8.10536 2.26522 8 2 8C1.73478 8 1.48043 8.10536 1.29289 8.29289C1.10536 8.48043 1 8.73478 1 9C1 9.26522 1.10536 9.51957 1.29289 9.70711C1.48043 9.89464 1.73478 10 2 10ZM2 3C2.26522 3 2.51957 2.89464 2.70711 2.70711C2.89464 2.51957 3 2.26522 3 2C3 1.73478 2.89464 1.48043 2.70711 1.29289C2.51957 1.10536 2.26522 1 2 1C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2C1 2.26522 1.10536 2.51957 1.29289 2.70711C1.48043 2.89464 1.73478 3 2 3Z"
                      stroke="#5E5E5E"
                      strokeWidth="2"
                    />
                  </svg>
                </button>

                {showOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-fillStrong rounded-lg shadow-lg">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-fillAssistive flex items-center"
                      onClick={() => router.push(`/post/${id}`)}
                    >
                      수정하기
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-fillAssistive flex items-center"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <hr className="border-fillNeutral mb-4" />
        <div>
          <h2 className="text-lg text-labelAssistive font-semibold mb-2">모집 정보</h2>
        </div>
        <div className="flex mb-4 flex-wrap">
          <div className="w-1/2 s:w-full">
            <p className="mb-4 flex">
              <strong className="text-labelNeutral w-20 font-baseBold">분류</strong>{" "}
              <span className="ml-5">{post.category}</span>
            </p>
            <p className="mb-4 flex">
              <strong className="text-labelNeutral w-20 font-baseBold">지역</strong>{" "}
              <span className="ml-5">{post.location}</span>
            </p>
            <p className="mb-4 flex">
              <strong className="text-labelNeutral w-20 font-baseBold">기간</strong>{" "}
              <span className="ml-5">{post.duration}개월</span>
            </p>
            <p className="mb-4 flex">
              <strong className="text-labelNeutral w-20 font-baseBold">총 인원</strong>
              <span className="ml-5">{post.total_members}명</span>
            </p>
            <p className="mb-4 flex">
              <strong className="text-labelNeutral w-20 font-baseBold">지원 방법</strong>
              <span className="ml-5">{post.personal_link}</span>
            </p>
          </div>
          <div className="w-1/2 s:w-full">
            <hr className="hidden s:block border-fillNeutral my-5" />
            <p className="mb-4 flex">
              <strong className="text-labelNeutral w-20 font-baseBold flex-shrink-0">모집 대상</strong>
              <span className="ml-5 text-left">{post.target_position.join(", ")}</span>
            </p>
            <p className="mb-4 flex">
              <strong className="text-labelNeutral w-20 font-baseBold">모집 인원</strong>
              <span className="ml-5">{post.recruitments}명</span>
            </p>

            <p className="mb-4 flex">
              <strong className="text-labelNeutral w-20 font-baseBold">마감일</strong>
              <span className="ml-5">{new Date(post.deadline).toLocaleDateString()}</span>
            </p>
            <p className="mb-4 flex">
              <strong className="text-labelNeutral w-20 font-baseBold">장소</strong>{" "}
              <span className="ml-5">{post.place}</span>
            </p>
            <div className="mb-4 flex items-start">
              <strong className="text-labelNeutral w-20 font-baseBold flex-shrink-0">기술 스택</strong>
              <span className="ml-4 flex flex-wrap justify-start items-center flex-grow">
                {renderTechStackIcons(post.tech_stack)}
              </span>
            </div>
          </div>
        </div>
        <hr className="border-fillNeutral mb-4" />
        <div>
          <h2 className="text-lg text-labelAssistive font-semibold mb-5 w-w-20">모집 내용</h2>
        </div>
        <div className="bg-fillLight p-4 rounded-lg shadow-md">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: cleanContent }} />
        </div>
      </div>

      {showDeleteModal && (
        <CommonModal isOpen={showDeleteModal} onRequestClose={() => setShowDeleteModal(false)}>
          <div className="p-4 text-center">
            <p className="text-lg font-semibold mb-4">정말 삭제하시겠어요?</p>
            <p className="text-sm text-labelNeutral mb-5">한번 삭제된 글은 다시 복구할 수 없어요.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-fillNeutral rounded-lg text-primary"
              >
                안 할래요
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-primary rounded-lg text-fillNeutral">
                삭제할래요
              </button>
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default MainDetailPage;
