import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import useSignupStore from "@/store/useSignupStore";
import { FormValues } from "@/components/Signup/Signup03";

const supabase = createClient();

const useSubmitProfile = (setUserData: (data: any) => void) => {
  const { nextStep, setNickname, setBlog, user, job_title, experience, profile_image_url } = useSignupStore();
  const [blogError, setBlogError] = useState<string | null>(null);
  const [blogSuccess, setBlogSuccess] = useState<string | null>(null);

  const validateUrl = (url: string): boolean => {
    if (!url || url.trim() === "") {
      return true; // URL이 비어 있으면 유효한 것으로 처리
    }

    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,6})" +
        "(:\\d+)?(\\/[-a-z\\d%_.~+\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF@]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i",
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
    if (blog && !/^https?:\/\//i.test(blog)) {
      formattedBlog = "http://" + blog;
    }

    if (formattedBlog && !validateUrl(formattedBlog)) {
      setBlogError("유효한 URL을 입력하세요.");
      setBlogSuccess(null);
      return;
    }

    setBlogError(null);
    setBlogSuccess("유효한 URL입니다.");

    try {
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
      setBlog(formattedBlog || ""); // 블로그가 비어있을 경우 빈 문자열로 설정
      setUserData({ ...user, nickname, blog: formattedBlog, job_title, experience, profile_image_url });

      nextStep();
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("nickname", { message: "An unexpected error occurred. Please try again." });
    }
  };

  return { onSubmit, blogError, blogSuccess, setBlogError, setBlogSuccess, validateUrl };
};

export default useSubmitProfile;
