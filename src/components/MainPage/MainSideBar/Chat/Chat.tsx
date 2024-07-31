"use client";

import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/supabase";
import { FormEvent, useEffect, useState } from "react";
import useSignupStore from "@/store/useSignupStore";
import Image from "next/image";

type MessageRow = Tables<"Messages">;

const Chat = () => {
  const { user } = useSignupStore();
  const [userInfo, setUserInfo] = useState<UserRow>();
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [deletedMessageId, setDeletedMessageId] = useState<string>("");
  const supabase = createClient();

  // customHook 으로 따로 빼서 코드 정리?
  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserInfo(user as UserRow);
    };

    getUserInfo();
  }, [user]);

  useEffect(() => {
    // 채팅 내역 불러오기
    const getAllMessages = async () => {
      const { data, error } = await supabase
        .from("Messages")
        .select(`*, Users (nickname, profile_image_url)`) // user_id 를 통해 관계가 맺어져 있어서 참조가 가능한 듯?
        .order("sent_at", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setMessages(data as MessageRow[]);
    };

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
        user_id: `${userInfo?.id}`,
        content: `${inputValue}`,
      })
      .select("*");

    if (error) {
      console.error("에러: ", error);
      return;
    }

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
          <div key={`${message.message_id}`}>
            {message.user_id === userInfo?.id ? (
              <>
                <div>{message?.content}</div>
                <button className="border-4 pointer" onClick={() => handleDelete(message.message_id)}>
                  삭제
                </button>
              </>
            ) : (
              <>
                <Image src={message.Users.profile_image_url} width={32} height={32} alt="profile image" />
                <span>{message.Users.nickname}</span>
                <div>{message?.content}</div>
              </>
            )}
          </div>
        );
      })}
      <form action="" onSubmit={(evt) => handleSubmit(evt)}>
        {user ? (
          <>
            <textarea
              placeholder="메시지를 입력하세요"
              value={inputValue}
              onChange={(evt) => setInputValue(evt.target.value)}
              className="border-4"
            />
            <button>전송</button>
          </>
        ) : (
          <>
            <textarea
              placeholder="채팅을 이용하려면 로그인을 해주세요."
              value={inputValue}
              onChange={(evt) => setInputValue(evt.target.value)}
              className="border-4"
              disabled
            />
            <button disabled>전송</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Chat;
