import PostCardLong from "@/components/MainPage/PostCard/PostCardLong";
import { fetchPosts } from "@/lib/fetchPosts";
import { Post } from "@/types/posts/Post.type";
import React from "react";

const AllPage = async () => {
  const posts: Post[] = await fetchPosts();

  if (!posts || posts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCardLong key={post.post_id} post={post} />
      ))}
    </>
  );
};

export default AllPage;
