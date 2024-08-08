"use client";

import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/supabase";
import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useUser } from "@/provider/UserContextProvider";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/Login/LoginForm";

type ChatUserInfo = {
  Users: {
    profile_image_url: string;
    nickname: string;
  };
};
type MessageRow = Tables<"Messages"> & ChatUserInfo;

const Chat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [deletedMessageId, setDeletedMessageId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const chatContentDiv = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  // customHook 으로 따로 빼서 코드 정리?

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
            console.log("INSERT EVENT ==>");
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

    return () => {
      openTalkSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (chatContentDiv.current && shouldScroll) {
      chatContentDiv.current.scrollTop = chatContentDiv.current.scrollHeight;

      setShouldScroll(false);
    }
  }, [messages]);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log("chat onsubmit");
    const { data, error } = await supabase
      .from("Messages")
      .insert({
        // channel_id 하드코딩 할 필요 없도록 해야함
        channel_id: "214322ba-1cbd-424c-9ef1-e4b281f71675",
        user_id: `${user?.id}`,
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
        <div id="container" className="h-[453px] w-full flex-col justify-start items-start inline-flex">
          <div
            id="header"
            className="self-stretch h-16 p-5 bg-[#141415] rounded-tl-[20px] rounded-tr-[20px] flex-col justify-center items-center flex"
          >
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="justify-center items-center gap-1 flex">
                <div className="w-6 h-6 p-1 justify-center items-center flex">
                  <div className="flex-col justify-center items-center inline-flex text-fontWhite">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.97142 3.99913C1.97135 3.41922 2.11771 2.84838 2.39735 2.33797C2.67699 1.82755 3.08113 1.39356 3.57342 1.07503C4.06572 0.756503 4.63072 0.563426 5.21762 0.513166C5.80452 0.462906 6.39491 0.557039 6.93569 0.7871C7.47646 1.01716 7.95067 1.37593 8.31564 1.83115C8.68062 2.28636 8.92493 2.82374 9.02659 3.39495C9.12825 3.96616 9.08407 4.55329 8.89804 5.10353C8.71201 5.65377 8.38995 6.14986 7.96083 6.54718C8.76988 6.93383 9.47233 7.50676 10.0087 8.21742C10.545 8.92808 10.8994 9.75553 11.0418 10.6297C11.0575 10.7269 11.0536 10.8263 11.0302 10.9221C11.0069 11.0178 10.9646 11.1081 10.9058 11.1878C10.847 11.2675 10.7729 11.335 10.6876 11.3865C10.6023 11.438 10.5075 11.4724 10.4087 11.4878C10.3099 11.5033 10.2089 11.4994 10.1116 11.4764C10.0143 11.4534 9.9226 11.4118 9.84165 11.3539C9.7607 11.2961 9.69211 11.2231 9.63982 11.1391C9.58753 11.0551 9.55255 10.9618 9.53688 10.8646C9.38457 9.92523 8.89705 9.07011 8.16186 8.45277C7.42668 7.83542 6.492 7.4963 5.52566 7.4963C4.55933 7.4963 3.62465 7.83542 2.88947 8.45277C2.15428 9.07011 1.66676 9.92523 1.51445 10.8646C1.49871 10.9618 1.46367 11.0551 1.41131 11.1391C1.35896 11.223 1.29032 11.296 1.20932 11.3538C1.12832 11.4116 1.03654 11.4532 0.939221 11.4761C0.841903 11.499 0.740954 11.5028 0.642136 11.4873C0.543319 11.4719 0.448568 11.4374 0.363295 11.3858C0.278021 11.3343 0.203894 11.2667 0.145147 11.187C0.0863995 11.1072 0.0441818 11.0169 0.0209042 10.9211C-0.00237331 10.8253 -0.00625483 10.7259 0.0094813 10.6287C0.15142 9.75461 0.505647 8.92721 1.04205 8.21679C1.57846 7.50638 2.28119 6.93396 3.0905 6.54818C2.73711 6.22098 2.45551 5.82601 2.26305 5.38763C2.07059 4.94924 1.97134 4.4767 1.97142 3.99913ZM11.1109 2.49969C11.7009 2.50009 12.2781 2.66909 12.7725 2.98616C13.2668 3.30322 13.657 3.75473 13.8957 4.28587C14.1344 4.81701 14.2114 5.40494 14.1172 5.97829C14.0231 6.55165 13.7619 7.08577 13.3653 7.51582C13.9838 7.81741 14.5333 8.23995 14.9802 8.75763C15.4272 9.27531 15.7623 9.87726 15.965 10.5267C16.0052 10.6527 16.0109 10.787 15.9814 10.9159C15.9519 11.0447 15.8883 11.1636 15.797 11.2605C15.7057 11.3573 15.5901 11.4287 15.4617 11.4673C15.3334 11.5059 15.1969 11.5104 15.0663 11.4803C14.9356 11.4506 14.8153 11.3874 14.7174 11.2972C14.6195 11.207 14.5475 11.0929 14.5088 10.9665C14.3265 10.3871 13.9947 9.86408 13.5459 9.44851C13.097 9.03294 12.5464 8.73902 11.9477 8.59542C11.7814 8.5559 11.6334 8.46242 11.5277 8.33004C11.4219 8.19766 11.3646 8.03409 11.3648 7.86569V7.51382C11.3647 7.37424 11.4042 7.23741 11.4788 7.11873C11.5535 7.00005 11.6603 6.90423 11.7872 6.84207C12.0951 6.69188 12.3423 6.44365 12.4888 6.13768C12.6352 5.83172 12.6723 5.486 12.5939 5.15669C12.5156 4.82737 12.3265 4.5338 12.0572 4.32366C11.788 4.11352 11.4545 3.99915 11.1109 3.99913C10.9089 3.99913 10.7152 3.92014 10.5724 3.77954C10.4295 3.63894 10.3493 3.44825 10.3493 3.24941C10.3493 3.05057 10.4295 2.85988 10.5724 2.71928C10.7152 2.57868 10.9089 2.49969 11.1109 2.49969ZM5.52566 1.99987C5.2552 1.99385 4.98623 2.04108 4.73457 2.13879C4.4829 2.2365 4.2536 2.38272 4.06013 2.56887C3.86665 2.75501 3.71291 2.97733 3.60792 3.22276C3.50294 3.4682 3.44882 3.73181 3.44875 3.99812C3.44868 4.26443 3.50267 4.52806 3.60753 4.77355C3.71239 5.01904 3.86602 5.24143 4.0594 5.42767C4.25278 5.61391 4.482 5.76024 4.73362 5.85808C4.98524 5.95591 5.25418 6.00327 5.52465 5.99739C6.05531 5.98584 6.56029 5.77025 6.93149 5.39677C7.30269 5.02329 7.51061 4.52161 7.51074 3.99912C7.51088 3.47662 7.30321 2.97484 6.9322 2.60118C6.56119 2.22752 6.05632 2.01169 5.52566 1.99987Z"
                        fill="#C3E88D"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-fontWhite text-base font-normal font-['Pretendard'] leading-[21px]">오픈톡</div>
              </div>
              <div className="w-6 h-6 rounded-md justify-center items-center gap-1 flex">
                <div className="justify-center items-center flex">
                  <div className="w-5 h-5 p-1 justify-center items-center flex">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-col justify-center items-center inline-flex text-fontWhite"
                    >
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L13 1" stroke="#919191" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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
                  {message.user_id === user?.id ? (
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
                            <div className="relative" style={{ width: "32px", height: "32px" }}>
                              <Image
                                className="rounded-xl"
                                src={message.Users.profile_image_url}
                                alt="profile image"
                                fill
                                sizes="(max-width: 32px) 100vw, 32px"
                                style={{ objectFit: "cover" }}
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
            {user ? (
              <div
                id="input"
                className="self-stretch h-[115px] w-full p-5 bg-[#141415] rounded-bl-[20px] rounded-br-[20px] flex-col justify-center items-center flex"
              >
                <div className="w-full h-full self-stretch justify-between items-start inline-flex">
                  <textarea
                    onChange={(evt) => setInputValue(evt.target.value)}
                    value={inputValue}
                    placeholder="메시지를 입력해보세요"
                    className="border mr-4 self-stretch w-full h-full p-5 bg-[#141415] text-fontWhite rounded-bl-[20px] rounded-br-[20px] flex-col justify-center items-center flex overflow-auto scrollbar-hide resize-none"
                  />
                  <div className="justify-center items-center flex">
                    <div className="w-5 h-5 p-1 justify-center items-center flex">
                      <div className="justify-center items-center flex">
                        <button className={`ml-1 text-fontWhite ${!inputValue ? "hidden" : ""}`}>
                          <svg
                            width="12"
                            height="14"
                            viewBox="0 0 12 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.600098 6.4L6.0001 1M6.0001 1L11.4001 6.4M6.0001 1V13"
                              stroke="#919191"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id="input"
                className="self-stretch h-[145px] w-full p-5 bg-[#141415] rounded-bl-[20px] rounded-br-[20px] flex-col justify-center items-center flex cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                }}
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
            {isModalOpen && (
              <>
                {/* 백드롭 추가 */}
                <div className="fixed inset-0 bg-black opacity-80 z-40" onClick={() => setIsModalOpen(false)}></div>
                {/* 모달 추가 */}
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-[20px] p-4 z-50">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="ml-auto mt-1 mr-1 block text-right p-1 text-3xl text-[fontWhite] hover:text-[#777]"
                  >
                    &times;
                  </button>
                  <LoginForm />
                </div>
              </>
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
                    {/* <div className="w-[3px] h-[3px] relative bg-[#ff3e02] rounded-full"> */}
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.97142 3.49913C1.97135 2.91922 2.11771 2.34838 2.39735 1.83797C2.67699 1.32755 3.08113 0.89356 3.57342 0.575031C4.06572 0.256503 4.63072 0.0634257 5.21762 0.0131657C5.80452 -0.0370943 6.39491 0.0570392 6.93569 0.287099C7.47646 0.51716 7.95067 0.875931 8.31564 1.33115C8.68062 1.78636 8.92493 2.32374 9.02659 2.89495C9.12825 3.46616 9.08407 4.05329 8.89804 4.60353C8.712 5.15377 8.38994 5.64986 7.96083 6.04718C8.76988 6.43383 9.47233 7.00676 10.0087 7.71742C10.545 8.42808 10.8994 9.25553 11.0418 10.1297C11.0575 10.2269 11.0536 10.3263 11.0302 10.4221C11.0069 10.5178 10.9646 10.6081 10.9058 10.6878C10.847 10.7675 10.7729 10.835 10.6876 10.8865C10.6023 10.938 10.5075 10.9724 10.4087 10.9878C10.3099 11.0033 10.2089 10.9994 10.1116 10.9764C10.0143 10.9534 9.9226 10.9118 9.84165 10.8539C9.76069 10.7961 9.69211 10.7231 9.63982 10.6391C9.58753 10.5551 9.55255 10.4618 9.53688 10.3646C9.38457 9.42523 8.89704 8.57011 8.16186 7.95277C7.42668 7.33542 6.492 6.9963 5.52566 6.9963C4.55933 6.9963 3.62465 7.33542 2.88947 7.95277C2.15428 8.57011 1.66676 9.42523 1.51445 10.3646C1.49871 10.4618 1.46367 10.5551 1.41131 10.6391C1.35896 10.723 1.29032 10.796 1.20932 10.8538C1.12832 10.9116 1.03654 10.9532 0.939221 10.9761C0.841903 10.999 0.740954 11.0028 0.642136 10.9873C0.543319 10.9719 0.448568 10.9374 0.363295 10.8858C0.278021 10.8343 0.203894 10.7667 0.145147 10.687C0.0863995 10.6072 0.0441818 10.5169 0.0209042 10.4211C-0.00237331 10.3253 -0.00625483 10.2259 0.0094813 10.1287C0.15142 9.2546 0.505647 8.4272 1.04205 7.71679C1.57846 7.00638 2.28119 6.43395 3.0905 6.04818C2.73711 5.72097 2.45551 5.32601 2.26305 4.88763C2.07059 4.44924 1.97134 3.9767 1.97142 3.49913ZM11.1109 1.99969C11.7009 2.00009 12.2781 2.16909 12.7725 2.48615C13.2668 2.80322 13.657 3.25473 13.8957 3.78587C14.1344 4.31701 14.2114 4.90494 14.1172 5.47829C14.0231 6.05165 13.7619 6.58577 13.3653 7.01582C13.9838 7.31741 14.5333 7.73995 14.9802 8.25763C15.4272 8.77531 15.7623 9.37726 15.965 10.0267C16.0052 10.1527 16.0109 10.287 15.9814 10.4159C15.9519 10.5447 15.8883 10.6636 15.797 10.7605C15.7057 10.8573 15.5901 10.9287 15.4617 10.9673C15.3334 11.0059 15.1969 11.0104 15.0663 10.9803C14.9356 10.9506 14.8152 10.8874 14.7174 10.7972C14.6195 10.707 14.5475 10.5929 14.5088 10.4665C14.3265 9.88711 13.9947 9.36408 13.5459 8.94851C13.097 8.53294 12.5464 8.23901 11.9477 8.09542C11.7814 8.0559 11.6334 7.96242 11.5277 7.83004C11.4219 7.69766 11.3646 7.53409 11.3648 7.36569V7.01382C11.3647 6.87424 11.4042 6.73741 11.4788 6.61873C11.5535 6.50005 11.6603 6.40423 11.7872 6.34207C12.0951 6.19188 12.3423 5.94364 12.4888 5.63768C12.6352 5.33172 12.6723 4.986 12.5939 4.65669C12.5156 4.32737 12.3264 4.0338 12.0572 3.82366C11.788 3.61352 11.4545 3.49915 11.1109 3.49913C10.9089 3.49913 10.7152 3.42014 10.5724 3.27954C10.4295 3.13894 10.3493 2.94825 10.3493 2.74941C10.3493 2.55057 10.4295 2.35988 10.5724 2.21928C10.7152 2.07868 10.9089 1.99969 11.1109 1.99969ZM5.52566 1.49987C5.2552 1.49385 4.98623 1.54108 4.73457 1.63879C4.4829 1.7365 4.2536 1.88272 4.06013 2.06887C3.86665 2.25501 3.71291 2.47733 3.60792 2.72276C3.50294 2.9682 3.44882 3.23181 3.44875 3.49812C3.44868 3.76443 3.50267 4.02806 3.60753 4.27355C3.71239 4.51904 3.86602 4.74143 4.0594 4.92767C4.25278 5.11391 4.482 5.26024 4.73362 5.35808C4.98524 5.45591 5.25418 5.50327 5.52465 5.49739C6.05531 5.48583 6.56029 5.27025 6.93149 4.89677C7.30269 4.52329 7.51061 4.02161 7.51074 3.49912C7.51087 2.97662 7.30321 2.47484 6.9322 2.10118C6.56119 1.72752 6.05632 1.51169 5.52566 1.49987Z"
                        fill="#5E5E5E"
                      />
                    </svg>
                    {/* </div> */}
                  </div>
                </div>
                <div className="text-fontWhite text-base font-normal font-['Pretendard'] leading-[21px]">오픈톡</div>
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
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 13L10 7L16 13" stroke="#919191" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
