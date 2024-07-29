"use client";

import { createClient } from "@/utils/supabase/client";
import { Tables, TablesInsert } from "@/types/supabase";
import { FormEvent, useEffect, useState } from "react";

type MessageRow = Tables<"Messages">;
type MessageInsert = TablesInsert<"Messages">;

const Chat = () => {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [deletedMessageId, setDeletedMessageId] = useState<string>("");
  const supabase = createClient();

  const getAllMessages = async () => {
    const { data, error } = await supabase.from("Messages").select("*").order("sent_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setMessages(data as MessageRow[]);
  };

  // customHook 으로 따로 빼서 코드 정리
  useEffect(() => {
    // 채팅 내역 불러오기
    getAllMessages();
    // INSERT 이벤트 감지
    const openTalkSubscription = supabase
      .channel("openTalk") // realtime 이라는 명칭만 아니면 아무 문자열이나 가능함
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Messages",
        },
        (payload) => {
          setMessages((prevMessages) => {
            return [...prevMessages, payload.new as MessageRow];
          });
          // setState 자체가 비동기적으로 동작해서 handleSubmit 함수 내부에서 동작하는 setNewMessages() 가 제대로 실행될 거라고 보장할 수 없다.
          // 따라서, 함수형으로 작성하고 데이터가 존재하는 것이 확실히 보장된 payload 객체를 이용하자!
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
          setMessages((prevMessages) => {
            return prevMessages.filter((prevMessage) => prevMessage.message_id !== deletedMessageId);
          });
        },
      )
      .subscribe();
  }, [supabase, messages]);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { data, error } = await supabase
      .from("Messages")
      .insert({
        // channel_id 하드코딩 할 필요 없도록 해야함
        channel_id: "214322ba-1cbd-424c-9ef1-e4b281f71675",
        user_id: "2e47ab8c-da7a-4590-b114-b0512b1b22cd",
        content: `${inputValue}`,
      })
      .select("*");

    if (error) {
      console.error("에러: ", error);
      return;
    }

    // setNewMessages(data); // 얘가 원인?, 실질적으로 필요하지 않을 수 있음.
    setInputValue("");
  };

  const handleDelete = async (message_id: string) => {
    setDeletedMessageId(message_id);

    const { error } = await supabase.from("Messages").delete().eq("message_id", message_id);

    if (error) {
      console.error("에러 : ", error);
      return;
    }
  };

  return (
    <div>
      {messages.map((message) => {
        return (
          <p key={`${message.message_id}`}>
            {message?.content}
            {/* 추후 user_id 정보 받아서 message 의 user_id 값과 비교해 조건 부 렌더링 적용하면 됨 */}
            <button className="border-4 pointer" onClick={() => handleDelete(message.message_id)}>
              삭제
            </button>
          </p>
        );
      })}
      <form action="" onSubmit={(evt) => handleSubmit(evt)}>
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={inputValue}
          onChange={(evt) => setInputValue(evt.target.value)}
          className="border-4"
        />
        <button>전송</button>
      </form>
    </div>
  );
};

export default Chat;
