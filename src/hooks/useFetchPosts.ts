import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Post } from "@/types/posts/Post.type";

const fetchPosts = async (): Promise<Post[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("Posts").select("*");
  if (error) throw new Error(error.message);
  console.log(data);
  return data as Post[];
};

const useFetchPosts = (): UseQueryResult<Post[], Error> => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

export default useFetchPosts;
