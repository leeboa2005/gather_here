import { createClient } from "@/utils/supabase/server";
import { Post } from "@/types/posts/Post.type";

export const fetchPosts = async (): Promise<Post[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("Posts").select("*");
  if (error) throw new Error(error.message);
  return data as Post[];
};
