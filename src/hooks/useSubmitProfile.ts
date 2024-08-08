import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import useSignupStore from "@/store/useSignupStore";
import { FormValues } from '@/components/Signup/Signup03';

const supabase = createClient();

const useSubmitProfile = (setUserData: (data: any) => void) => {
  const { nextStep, setNickname, setBlog, user, job_title, experience, profile_image_url } = useSignupStore();
  const [blogError, setBlogError] = useState<string | null>(null);
  const [blogSuccess, setBlogSuccess] = useState<string | null>(null);

  const validateUrl = (url: string): boolean => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,6})" +
      "(:\\d+)?(\\/[-a-z\\d%_.~+\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF@]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return urlPattern.test(url);
  };

  const onSubmit = async (data: FormValues, nicknameAvailable: boolean | null, setError: any) => {
    const { nickname, blog } = data;

    if (!user?.email) {
      setError("nickname", { message: "유효한 이메일을 확인할 수 없습니다." });
      return;
    }

    if (nicknameAvailable === false) {
      setError("nickname", { message: "이미 사용 중인 닉네임입니다." });
      return;
    }

    let formattedBlog = blog;
    if (!/^https?:\/\//i.test(blog)) {
      formattedBlog = "http://" + blog;
    }

    if (!validateUrl(formattedBlog)) {
      setBlogError("유효한 URL을 입력하세요.");
      setBlogSuccess(null);
      return;
    }

    setBlogError(null);
    setBlogSuccess("유효한 URL입니다.");

    try {
      const { data, error: fetchError } = await supabase.from("Users").select("user_id").eq("user_id", user.id);

      if (fetchError) {
        console.error("Error fetching data:", fetchError);
        setError("nickname", { message: "Failed to fetch user data. Please try again." });
        return;
      }

      if (data && data.length > 0) {
        const { error: updateError } = await supabase
          .from("Users")
          .update({
            job_title,
            experience,
            nickname,
            blog: formattedBlog,
            email: user.email,
            profile_image_url,
          })
          .eq("user_id", user.id);

        if (updateError) {
          console.error("Error updating data:", updateError);
          setError("nickname", { message: "Failed to update profile. Please try again." });
          return;
        }

        setNickname(nickname);
        setBlog(formattedBlog);
      } else {
        const { data, error: insertError } = await supabase
          .from("Users")
          .insert({
            user_id: user.id,
            job_title,
            experience,
            nickname,
            blog: formattedBlog,
            email: user.email,
            profile_image_url,
          })
          .select();

        if (insertError) {
          console.error("Error inserting data:", insertError);
          setError("nickname", { message: "Failed to save profile. Please try again." });
          return;
        }
        setUserData(data[0]);
        setNickname(nickname);
        setBlog(formattedBlog);
      }

      nextStep();
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("nickname", { message: "An unexpected error occurred. Please try again." });
    }
  };

  return { onSubmit, blogError, blogSuccess, setBlogError, setBlogSuccess, validateUrl };
};

export default useSubmitProfile;