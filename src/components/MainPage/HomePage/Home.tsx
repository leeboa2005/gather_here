import React from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Carousel from "../Carousel/Carousel";
import { createClient } from "@/utils/supabase/client";
import { Post } from "@/types/posts/Post.type";

const fetchPosts = async (): Promise<Post[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("Posts").select("*");
  if (error) throw new Error(error.message);
  console.log(data);
  return data as Post[];
};

const Home: React.FC = () => {
  const { data, isLoading, error }: UseQueryResult<Post[], Error> = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div>
      <h1 className="font-bold text-lg">마감 임박</h1>
      <Carousel posts={data as Post[]} />
    </div>
  );
};

export default Home;
