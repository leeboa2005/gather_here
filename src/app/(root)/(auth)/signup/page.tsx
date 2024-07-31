"use client";

import { useModal } from "@/provider/ContextProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import SignupForm from "@/components/Signup/SigupForm";

const supabase = createClient();

const SignupPage = () => {
  const { openModal } = useModal();
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching logged-in user:", userError);
        return;
      }

      if (!user) {
        return;
      }

      const { data, error } = await supabase.from("Users").select("user_id").eq("user_id", user.id).maybeSingle();

      if (error) {
        console.error("Error fetching user from Users table:", error.message);
        return;
      }

      if (data) {
        router.push("/");
        return;
      }

      if (!modalOpened) {
        openModal(<SignupForm />, true); // 페이지 비활성화 설정
        setModalOpened(true);
      }
    };

    checkUser();
  }, [openModal, router, modalOpened]);

  return <></>;
};

export default SignupPage;
