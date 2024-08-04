import { createClient } from "@/utils/supabase/client";
import { PostWithUser } from "@/types/posts/Post.type";
import { Tables } from "@/types/supabase";

export interface FetchPostsFilters {
  targetPosition?: string[];
  place?: string;
  location?: string;
  duration?: { gt?: number; lte?: number } | null;
  user_id?: string;
}
interface FetchPostsOptions {
  order?: { column: string; ascending: boolean };
}

export const fetchPosts = async (
  page: number,
  category?: string,
  filters: FetchPostsFilters = {},
  options: FetchPostsOptions = {},
): Promise<PostWithUser[]> => {
  const supabase = createClient();
  const postsPerPage = 5;
  const today = new Date().toISOString().split("T")[0];
  const start = (page - 1) * postsPerPage;

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
    .gte("deadline", today);

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
    if (filters.duration.gt !== undefined) {
      query.gt("duration", filters.duration.gt);
    }
    if (filters.duration.lte !== undefined) {
      query.lte("duration", filters.duration.lte);
    }
  }
  if (filters.user_id) {
    query.eq("user_id", filters.user_id);
  }
  if (options.order) {
    query.order(options.order.column, { ascending: options.order.ascending });
  }

  query.range(start, start + postsPerPage - 1);
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
    .gte("deadline", formattedToday)
    .lte("deadline", formattedFutureDate)
    .order("created_at", { ascending: false });

  if (category) {
    query.eq("category", category);
  }
  const { data, error } = await query.throwOnError();
  if (error) throw error;
  return data as PostWithUser[];
};

// 좋아요한 포스트를 가져오는 함수
export const fetchLikedPosts = async (userId: string): Promise<PostWithUser[]> => {
  const supabase = createClient();

  // 관심 있는 스터디,프로젝트 가져오기
  const { data: interestsData, error: interestsError } = await supabase
    .from("Interests")
    .select("post_id, category")
    .eq("user_id", userId);

  if (interestsError) {
    console.error("내 관심 글 정보 불러오는 중 오류 발생:", interestsError);
    return [];
  }

  // IT 행사 관심 정보 가져오기
  const { data: itInterestsData, error: itInterestsError } = await supabase
    .from("IT_Interests")
    .select("event_id")
    .eq("user_id", userId);

  if (itInterestsError) {
    console.error("내 관심 글 IT 행사 정보 불러오는 중 오류 발생:", itInterestsError);
    return [];
  }

  // 포스트 ID와 이벤트 ID 추출
  const postIds = interestsData.map((interest) => interest.post_id);
  const eventIds = itInterestsData.map((interest) => interest.event_id);

  // 포스트 데이터 가져오기
  const { data: postsData, error: postsError } = await supabase.from("Posts").select("*").in("post_id", postIds);
  if (postsError) {
    console.error("포스트 불러오는 중 오류 발생:", postsError);
    return [];
  }

  // 이벤트 데이터 가져오기
  const { data: eventsData, error: eventsError } = await supabase
    .from("IT_Events")
    .select("*")
    .in("event_id", eventIds);
  if (eventsError) {
    console.error("IT 행사 정보 불러오는 중 오류 발생:", eventsError);
    return [];
  }

  return [...postsData, ...eventsData] as PostWithUser[];
};

export const fetchEventsPostsWithDeadLine = async (
  days: number,
  category?: string | null,
): Promise<Tables<"IT_Events">[]> => {
  const supabase = createClient();
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + days);
  const formattedToday = today.toISOString().split("T")[0];
  const formattedFutureDate = futureDate.toISOString().split("T")[0];
  const query = supabase
    .from("IT_Events")
    .select("*")
    .gte("date_done", formattedToday)
    .lte("date_done", formattedFutureDate)
    .order("date_start", { ascending: false });

  if (category) {
    query.eq("category", category);
  }
  const { data, error } = await query.throwOnError();
  if (error) throw error;
  return data as Tables<"IT_Events">[];
};

export const fetchEventsPosts = async (
  page: number,
  category?: string,
  filters: FetchPostsFilters = {},
  options: FetchPostsOptions = {},
): Promise<Tables<"IT_Events">[]> => {
  const supabase = createClient();
  const postsPerPage = 5;
  const today = new Date().toISOString().split("T")[0];
  const start = (page - 1) * postsPerPage;

  const query = supabase.from("IT_Events").select("*").gte("date_done", today);

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
    if (filters.duration.gt !== undefined) {
      query.gt("duration", filters.duration.gt);
    }
    if (filters.duration.lte !== undefined) {
      query.lte("duration", filters.duration.lte);
    }
  }
  if (filters.user_id) {
    query.eq("user_id", filters.user_id);
  }
  if (options.order) {
    query.order(options.order.column, { ascending: options.order.ascending });
  }

  query.range(start, start + postsPerPage - 1);
  const { data, error } = await query.throwOnError();
  if (error) throw error;

  return data as Tables<"IT_Events">[];
};
