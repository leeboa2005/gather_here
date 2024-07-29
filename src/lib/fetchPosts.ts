import { createClient } from "@/utils/supabase/client";
import { PostWithUser } from "@/types/posts/Post.type";

export const fetchPosts = async (page: number, category?: string): Promise<PostWithUser[]> => {
  const supabase = createClient();
  const postsPerPage = 5;
  const today = new Date().toISOString().split("T")[0];

  const start = (page - 1) * postsPerPage;
  const end = page * postsPerPage - 1;

  const query = supabase
    .from("Posts")
    .select(
      `
      *,
      user:Users(
        nickname,
        email,
        profile_image_url
      )
    `,
    )
    .gt("deadline", today)
    .range(start, end);

  if (category) {
    query.eq("category", category);
  }

  const { data, error } = await query.throwOnError();

  if (error) throw error;
  return data as PostWithUser[];
};

export const fetchPostsWithDeadLine = async (days: number, category?: string): Promise<PostWithUser[]> => {
  const supabase = createClient();
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + days);

  const formattedToday = today.toISOString().split("T")[0];
  const formattedFutureDate = futureDate.toISOString().split("T")[0];

  const query = supabase
    .from("Posts")
    .select(
      `
      *,
      user:Users(
        nickname,
        email,
        profile_image_url
      )
    `,
    )
    .gt("deadline", formattedToday)
    .lte("deadline", formattedFutureDate)
    .order("created_at", { ascending: false });

  if (category) {
    query.eq("category", category);
  }

  const { data, error } = await query.throwOnError();

  if (error) throw error;
  return data as PostWithUser[];
};
