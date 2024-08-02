import { createClient } from "@/utils/supabase/client";
import { PostWithUser } from "@/types/posts/Post.type";
interface FetchPostsFilters {
  targetPosition?: string[];
  place?: string;
  location?: string;
  duration?: number | null;
}
export const fetchPosts = async (
  page: number,
  category?: string,
  filters: FetchPostsFilters = {},
): Promise<PostWithUser[]> => {
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
      user:Users!Posts_user_id_fkey (
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
  if (filters.targetPosition && filters.targetPosition.length > 0) {
    query.contains("target_position", filters.targetPosition);
  }
  if (filters.place && filters.place !== "") {
    query.eq("place", filters.place);
  }
  if (filters.location && filters.location !== "") {
    query.eq("location", filters.location);
  }
  if (filters.duration !== null && filters.duration !== undefined) {
    query.eq("duration", filters.duration);
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
      user:Users!Posts_user_id_fkey (
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
