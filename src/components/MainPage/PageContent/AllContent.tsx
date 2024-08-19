"use client";
import React, { useEffect, useState, useMemo } from "react";
import InfiniteScrollComponent from "@/components/MainPage/InfiniteScroll/InfiniteScrollComponents";
import { fetchPosts } from "@/lib/fetchPosts";
import { PostWithUser } from "@/types/posts/Post.type";
import Image from "next/image";
import Calender from "../MainSideBar/Calender/Calender";
import useSearch from "@/hooks/useSearch";

interface AllContentProps {
  initialPosts: PostWithUser[];
}

const AllContent: React.FC<AllContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<PostWithUser[]>(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  const { searchWord } = useSearch();

  // 초기 데이터 로드 부분에서 중복 로드를 방지하고, initialPosts를 사용해 상태를 설정
  useEffect(() => {
    if (initialPosts.length > 0) {
      setPosts(initialPosts);
    } else {
      const fetchInitialPosts = async () => {
        const latestPosts: PostWithUser[] = await fetchPosts(1);
        const uniquePosts = latestPosts.filter(
          (post, index, self) => index === self.findIndex((p) => p.post_id === post.post_id),
        );
        setPosts(uniquePosts);
      };
      fetchInitialPosts();
    }
  }, [initialPosts]);

  // 추가 게시물을 불러오는 함수
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

    setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
  };

  // 검색어에 따라 게시물을 필터링
  const filteredPosts = useMemo(() => {
    if (!searchWord) return posts;
    const lowerSearchWord = searchWord.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerSearchWord) || post.content.toLowerCase().includes(lowerSearchWord),
    );
  }, [searchWord, posts]);

  return (
    <>
      <div className="hidden m:block">
        <Calender />
      </div>
      <div className="flex items-center">
        <Image src="/assets/puzzle.svg" alt="Puzzle Icon" width={20} height={20} className="mb-3" />
        <p className="m-2 mb-4 text-labelNormal">나에게 꼭 맞는 동료들을 찾아보세요</p>
      </div>
      <InfiniteScrollComponent posts={filteredPosts} hasMore={hasMore} loadMorePosts={loadMorePosts} />
    </>
  );
};

export default AllContent;