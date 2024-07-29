"use client";
import React, { useEffect, useState } from "react";
import InfiniteScrollComponent from "@/components/MainPage/InfiniteScroll/InfiniteScrollComponents";
import { fetchPosts } from "@/lib/fetchPosts";
import { PostWithUser } from "@/types/posts/Post.type";
import Calender from "../MainSideBar/Calender/Calender";
import CommonModal from "@/components/Common/Modal/CommonModal";

interface AllContentProps {
  initialPosts: PostWithUser[];
}

const AllContent: React.FC<AllContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<PostWithUser[]>(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const uniquePosts = initialPosts.filter(
      (post, index, self) => index === self.findIndex((p) => p.post_id === post.post_id),
    );
    setPosts(uniquePosts);
  }, [initialPosts]);

  // 모바일 및 중간 크기 판별
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1068);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 게시물
  const loadMorePosts = async () => {
    console.log("Loading more posts for page:", page);
    const newPosts: PostWithUser[] = await fetchPosts(page);
    console.log("New posts:", newPosts);

    if (!newPosts || newPosts.length === 0) {
      console.log("No more posts to load");
      setHasMore(false);
      return;
    }

    setPosts((prevPosts) => {
      const allPosts = [...prevPosts, ...newPosts];
      console.log("All posts before filtering:", allPosts);
      const uniquePosts = allPosts.filter(
        (post, index, self) => index === self.findIndex((p) => p.post_id === post.post_id),
      );
      console.log("Unique posts after filtering:", uniquePosts);
      return uniquePosts;
    });

    setPage((prevPage) => {
      console.log("Setting page to:", prevPage + 1);
      return prevPage + 1;
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-container-l m:max-w-container-m s:max-w-container-s px-4 mt-6">
      <div className={`flex ${isMobile ? "flex-col" : "space-x-4"}`}>
        <div className={`w-full ${!isMobile ? "md:w-2/3" : ""}`}>
          <InfiniteScrollComponent posts={posts} hasMore={hasMore} loadMorePosts={loadMorePosts} />
        </div>
        {!isMobile && (
          <div className="w-1/3">
            <div className="sticky top-4">
              <Calender />
            </div>
          </div>
        )}
      </div>
      {isMobile && (
        <button
          onClick={openModal}
          className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg z-50"
        >
          캘린더
        </button>
      )}
      <CommonModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <Calender />
      </CommonModal>
    </div> // 캘린더→채팅컴포넌트로 바뀔예정
  );
};

export default AllContent;
