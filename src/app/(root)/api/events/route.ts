import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  let { data, error } = await supabase.from("IT_Events").select("*");
  if (error) {
    console.log(error);
  }

  return NextResponse.json({ data });
};
