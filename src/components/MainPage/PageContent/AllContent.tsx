"use client";
import React, { useEffect, useState } from "react";
import InfiniteScrollComponent from "@/components/MainPage/InfiniteScroll/InfiniteScrollComponents";
import { fetchPosts } from "@/lib/fetchPosts";
import { PostWithUser } from "@/types/posts/Post.type";
import Image from "next/image";
import MainLayout from "@/components/Layout/MainLayout";

interface AllContentProps {
  initialPosts: PostWithUser[];
}

const AllContent: React.FC<AllContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<PostWithUser[]>(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const latestPosts: PostWithUser[] = await fetchPosts(1);
      const uniquePosts = latestPosts.filter(
        (post, index, self) => index === self.findIndex((p) => p.post_id === post.post_id),
      );
      setPosts(uniquePosts);
    };
    fetchInitialPosts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1068);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMorePosts = async () => {
    const newPosts: PostWithUser[] = await fetchPosts(page);

    if (!newPosts || newPosts.length === 0) {
      setHasMore(false);
      return;
    }

    setPosts((prevPosts) => {
      const allPosts = [...prevPosts, ...newPosts];
      const uniquePosts = allPosts.filter(
        (post, index, self) => index === self.findIndex((p) => p.post_id === post.post_id),
      );
      return uniquePosts;
    });

    setPage((prevPage) => {
      return prevPage + 1;
    });
  };

  return (
    <MainLayout>
      <div className="flex items-center">
        <Image src="/assets/puzzle.svg" alt="Puzzle Icon" width={20} height={20} />
        <p className="m-2 text-labelNormal">나에게 꼭 맞는 동료들을 찾아보세요</p>
      </div>
      <InfiniteScrollComponent posts={posts} hasMore={hasMore} loadMorePosts={loadMorePosts} />
    </MainLayout>
  );
};

export default AllContent;
