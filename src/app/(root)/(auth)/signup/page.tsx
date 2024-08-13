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
        router.push("/");
        return;
      }

      if (!modalOpened) {
        openModal(<SignupForm />, true);
        setModalOpened(true);
      }
    };

    checkUser();
  }, [openModal, router, modalOpened]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "고객님의 기본적인 정보는 마이페이지에서 수정하실 수 있습니다.";
    };

    const handlePopState = () => {
      const confirmLeave = window.confirm(
        "고객님의 기본적인 정보는 마이페이지에서 수정하실 수 있습니다. 정말로 이 페이지를 떠나시겠습니까?"
      );
      if (confirmLeave) {
        router.push("/");
      } else {
        // 사용자 동작을 취소했을 때, 뒤로가기 동작을 무효화하여 페이지에 그대로 머물게 합니다.
        history.pushState(null, "", location.href);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return <></>;
};

export default SignupPage;