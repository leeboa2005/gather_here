"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDeadlinePosts } from "@/lib/fetchDeadlinePosts";
import { Post } from "@/types/posts/Post.type";
import PostCardLong from "@/components/Common/Card/PostCard/PostCardLong";
import AdCard from "@/components/MainPage/AdCard/AdCard";

const Carousel = dynamic(() => import("@/components/MainPage/Carousel/Carousel"), { ssr: false });

interface ProjectContentProps {
  initialPosts: Post[];
}

const ProjectContent: React.FC<ProjectContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMorePosts();
  }, []);

  const loadMorePosts = async () => {
    const newPosts: Post[] = await fetchDeadlinePosts(page, "프로젝트", 200); // 필요한 날짜 범위로 변경

    if (!newPosts || newPosts.length === 0) {
      setHasMore(false);
      return;
    }

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1 className="font-bold text-lg">마감 임박</h1>
      <Carousel posts={posts} />
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: "center" }}>모든 포스트를 불러왔습니다.</p>}
      >
        {posts.map((post, index) => (
          <React.Fragment key={`${post.post_id}_${index}`}>
            <PostCardLong post={post} />
            {(index + 1) % 5 === 0 && <AdCard key={`ad_${index}`} />}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ProjectContent;
