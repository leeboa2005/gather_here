import { fetchPosts } from "@/lib/fetchPosts";
import { Post } from "@/types/posts/Post.type";

export const fetchDeadlinePosts = async (page: number, category: string, days: number): Promise<Post[]> => {
  const posts = await fetchPosts(page);
  console.log(posts.length);
  const today = new Date();
  const deadlineDate = new Date(today);
  deadlineDate.setDate(today.getDate() + days);

  return posts.filter((post) => {
    const postDeadline = new Date(post.deadline);
    return post.category === category && postDeadline <= deadlineDate;
  });
};
