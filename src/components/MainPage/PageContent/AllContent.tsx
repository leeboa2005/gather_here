"use client";
import React, { useEffect, useState } from "react";
import InfiniteScrollComponent from "@/components/MainPage/InfiniteScroll/InfiniteScrollComponents";
import { fetchPosts } from "@/lib/fetchPosts";
import { Post } from "@/types/posts/Post.type";
import Calender from "../MainSideBar/Calender/Calender";
import Chat from "../MainSideBar/Chat/Chat";

interface AllContentProps {
  initialPosts: Post[];
}

const AllContent: React.FC<AllContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

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

  return (
    <div className="w-full max-w-container-l m:max-w-container-m s:max-w-container-s px-4 flex space-x-4 mt-6">
      <div className="w-2/3">
        <InfiniteScrollComponent posts={posts} hasMore={hasMore} loadMorePosts={loadMorePosts} />
      </div>
      <div className="w-1/3">
        <Calender />
        <Chat />
      </div>
    </div>
  );
};

export default AllContent;
