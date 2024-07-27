"use client";
import React, { useEffect, useState } from "react";
import InfiniteScrollComponent from "@/components/MainPage/InfiniteScroll/InfiniteScrollComponents";
import { fetchPosts } from "@/lib/fetchPosts";
import { Post } from "@/types/posts/Post.type";

interface AllContentProps {
  initialPosts: Post[];
}

const AllContent: React.FC<AllContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2); // 초기 페이지를 2로 설정 (1페이지는 이미 불러왔)

  useEffect(() => {
    const uniquePosts = initialPosts.filter(
      (post, index, self) => index === self.findIndex((p) => p.post_id === post.post_id),
    );
    setPosts(uniquePosts);
  }, [initialPosts]);

  const loadMorePosts = async () => {
    try {
      const newPosts: Post[] = await fetchPosts(page);

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

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    }
  };

  return <InfiniteScrollComponent posts={posts} hasMore={hasMore} loadMorePosts={loadMorePosts} />;
};

export default AllContent;
