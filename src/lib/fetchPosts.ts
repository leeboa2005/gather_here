// "use server";
// import { createClient } from "@/utils/supabase/server";
// import { Post } from "@/types/posts/Post.type";

// export const fetchPosts = async (page: number): Promise<Post[]> => {
//   const supabase = createClient();
//   const postsPerPage = 5; // 페이지당 불러올 포스트 수

//   const { data, error } = await supabase
//     .from("Posts")
//     .select("*")
//     .range(page * postsPerPage, (page + 1) * postsPerPage - 1);
//   console.log(data);
//   if (error) throw new Error(error.message);
//   return data as Post[];
// };
import { createClient } from "@/utils/supabase/client";
import { Post } from "@/types/posts/Post.type";

export const fetchPosts = async (page: number): Promise<Post[]> => {
  const supabase = createClient();
  const postsPerPage = 5;

  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .range(page * postsPerPage, (page + 1) * postsPerPage - 1);

  if (error) throw new Error(error.message);
  return data as Post[];
};
