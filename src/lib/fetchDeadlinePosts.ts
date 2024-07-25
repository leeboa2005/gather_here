import { fetchPosts } from "@/lib/fetchPosts";
import { Post } from "@/types/posts/Post.type";

export const fetchDeadlinePosts = async (page: number, category: string, days: number): Promise<Post[]> => {
  const posts = await fetchPosts(page);
  const today = new Date();
  const deadlineDate = new Date(today);
  deadlineDate.setDate(today.getDate() + days);

  return posts.filter((post) => post.category === category && new Date(post.deadline) <= deadlineDate);
};
