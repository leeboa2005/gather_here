"use client";

import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/supabase";
import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";

type ChatUserInfo = {
  Users: {
    profile_image_url: string;
    nickname: string;
  };
};
type MessageRow = Tables<"Messages"> & ChatUserInfo;

const Chat = () => {
  const [userInfo, setUserInfo] = useState<UserRow>();
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [deletedMessageId, setDeletedMessageId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  const chatContentDiv = useRef<HTMLDivElement>(null);

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
  }, [userInfo]);

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

  useEffect(() => {
    if (chatContentDiv.current && shouldScroll) {
      chatContentDiv.current.scrollTop = chatContentDiv.current.scrollHeight;

      setShouldScroll(false);
    }
  }, [messages]);

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
    setShouldScroll(true);
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
    <>
      {isOpen ? (
        <div id="container" className="h-[663px] w-full flex-col justify-start items-start inline-flex">
          <div
            id="header"
            className="self-stretch h-16 p-5 bg-[#141415] rounded-tl-[20px] rounded-tr-[20px] flex-col justify-center items-center flex"
          >
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="justify-center items-center gap-1 flex">
                <div className="w-6 h-6 p-1 justify-center items-center flex">
                  <div className="flex-col justify-center items-center inline-flex">아이콘</div>
                </div>
                <div className="text-[#c4c4c4] text-sm font-normal font-['Pretendard'] leading-[21px]">오픈톡</div>
              </div>
              <div className="w-6 h-6 rounded-md justify-center items-center gap-1 flex">
                <div className="justify-center items-center flex">
                  <div className="w-5 h-5 p-1 justify-center items-center flex">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-col justify-center items-center inline-flex"
                    >
                      토글 버튼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="message"
            className="self-stretch h-[454px] py-5 bg-[#141415] flex-col justify-start items-start gap-3 flex overflow-y-scroll scrollbar-hide"
            ref={chatContentDiv}
          >
            {messages.map((message) => {
              return (
                <div key={`${message.message_id}`} className="w-full mb-3">
                  {message.user_id === userInfo?.id ? (
                    <div id="mine" className="self-stretch px-3 flex-col justify-center items-end flex">
                      <div className="flex-col justify-center items-end gap-1 flex">
                        <div className="flex items-end">
                          <button className="mr-2 pointer" onClick={() => handleDelete(message.message_id)}>
                            삭제
                          </button>
                          <div className="max-w-[190px] p-3 bg-[#c3e88d] rounded-tl-[20px] rounded-tr rounded-bl-[20px] rounded-br-[20px] justify-center items-center gap-2.5 inline-flex">
                            <div className="w-full text-[#2b2b2b] text-sm font-normal font-['Pretendard'] leading-snug whitespace-pre-wrap break-words overflow-hidden">
                              {message.content}
                            </div>
                          </div>
                        </div>
                        <div className="mt-1 self-stretch text-right text-[#919191] text-xs font-normal font-['Pretendard'] leading-none">
                          {dayjs(message.sent_at).format("YYYY-MM-DD HH:mm")}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div id="others" className="self-stretch px-3 justify-start items-start gap-3 inline-flex">
                        <div className="w-8 h-8 bg-[#3b3d3f] rounded-[9px] justify-center items-center flex">
                          <div className="justify-center items-center flex">
                            <div className="relative">
                              <Image
                                className="rounded-xl"
                                src={message.Users.profile_image_url}
                                width={32}
                                height={32}
                                alt="profile image"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="max-w-[190px] flex-col justify-start items-start gap-1 inline-flex">
                          <div className="self-stretch text-[#f7f7f7] text-base font-normal font-['Pretendard'] leading-relaxed">
                            {message.Users.nickname}
                          </div>
                          <div className="w-full p-3 bg-[#323334] rounded-tl rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] justify-center items-center gap-2.5 inline-flex">
                            <div className="w-full text-[#f7f7f7] text-sm font-normal font-['Pretendard'] leading-snug whitespace-pre-wrap break-words overflow-hidden">
                              {message.content}
                            </div>
                          </div>
                          <div className="mt-1 self-stretch text-[#919191] text-xs font-normal font-['Pretendard'] leading-none">
                            {dayjs(message.sent_at).format("YYYY-MM-DD HH:mm")}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <form action="" className="w-full" onSubmit={(evt) => handleSubmit(evt)}>
            {userInfo ? (
              <div
                id="input"
                className="self-stretch h-[145px] w-full p-5 bg-[#141415] rounded-bl-[20px] rounded-br-[20px] flex-col justify-center items-center flex"
              >
                <div className="w-full h-full self-stretch justify-between items-start inline-flex">
                  <textarea
                    onChange={(evt) => setInputValue(evt.target.value)}
                    value={inputValue}
                    placeholder="메시지를 입력해보세요"
                    className="border mr-4 self-stretch w-full h-full p-5 bg-[#141415] rounded-bl-[20px] rounded-br-[20px] flex-col justify-center items-center flex overflow-auto scrollbar-hide resize-none"
                  />
                  <div className="justify-center items-center flex">
                    <div className="w-5 h-5 p-1 justify-center items-center flex">
                      <div className="justify-center items-center flex">
                        <button className={`ml-1 ${!inputValue ? "hidden" : ""}`}>전송</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id="input"
                className="self-stretch h-[145px] w-full p-5 bg-[#141415] rounded-bl-[20px] rounded-br-[20px] flex-col justify-center items-center flex"
              >
                <div className="w-full h-full self-stretch justify-between items-start inline-flex">
                  <div className="w-full h-full grow shrink basis-0 text-[#5e5e5e] text-sm font-normal mr-2 font-['Pretendard'] leading-[21px] break-all overflow-y-hidden whitespace-pre-wrap break-words">
                    채팅을 이용하시려면 로그인을 해주세요.
                  </div>
                  <div className="justify-center items-center flex">
                    <div className="w-5 h-5 p-1 justify-center items-center flex">
                      <div className="justify-center items-center flex"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="w-full h-16 flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-16 p-5 bg-[#141415] rounded-[20px] flex-col justify-center items-center flex">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="justify-center items-center gap-1 flex">
                <div className="w-6 h-6 p-1 justify-center items-center flex">
                  <div className="flex-col justify-center items-end inline-flex">
                    <div className="w-[3px] h-[3px] relative bg-[#ff3e02] rounded-full">아이콘</div>
                  </div>
                </div>
                <div className="text-[#c4c4c4] text-sm font-normal font-['Pretendard'] leading-[21px]">오픈톡</div>
              </div>
              <div className="w-6 h-6 rounded-md justify-center items-center gap-1 flex">
                <div className="justify-center items-center flex">
                  <div className="w-5 h-5 p-1 justify-center items-center flex">
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setShouldScroll(true);
                      }}
                      className="flex-col justify-center items-center inline-flex"
                    >
                      토글 버튼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          애니메이션 필요함
        </div>
      )}
    </>
  );
};

export default Chat;
