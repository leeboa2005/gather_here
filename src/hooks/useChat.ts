import { useState, useEffect, useRef, FormEvent } from "react";
import { useUser } from "@/provider/UserContextProvider";
import { createClient } from "@/utils/supabase/client";
import { MessageRow } from "@/types/chats/Chats.type";

const useChat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const chatContentDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    const getAllMessages = async () => {
      const { data: messages, error } = await supabase
        .from("Messages")
        .select(`*, Users (nickname, profile_image_url)`)
        .order("sent_at", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setMessages(messages as MessageRow[]);

      if (chatContentDiv.current) {
        requestAnimationFrame(() => {
          chatContentDiv.current!.scrollTop = chatContentDiv.current!.scrollHeight;
        });
      }
    };

    getAllMessages();

    const openTalkSubscription = supabase
      .channel("openTalk")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Messages",
        },
        () => {
          getAllMessages();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "Messages",
        },
        () => {
          getAllMessages();
        },
      )
      .subscribe();

    return () => {
      openTalkSubscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!user) return;

    const supabase = createClient();

    const { error } = await supabase
      .from("Messages")
      .insert({
        channel_id: "214322ba-1cbd-424c-9ef1-e4b281f71675", // 예제에서는 하드코딩된 채널 ID 사용
        user_id: `${user.id}`,
        content: inputValue,
      })
      .select("*");

    if (error) {
      console.error("에러: ", error);
      return;
    }

    setInputValue("");
  };

  const handleDelete = async (message_id: string) => {
    const supabase = createClient();

    const { error } = await supabase.from("Messages").delete().eq("message_id", message_id);

    if (error) {
      console.error("에러: ", error);
      return;
    }
  };

  return {
    user,
    messages,
    inputValue,
    setInputValue,
    isModalOpen,
    setIsModalOpen,
    chatContentDiv,
    handleSubmit,
    handleDelete,
  };
};

export default useChat;
