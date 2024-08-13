"use client";

import Image from "next/image";
import dayjs from "dayjs";
import LoginForm from "@/components/Login/LoginForm";
import useChat from "@/hooks/useChat";

const Chat = () => {
  const {
    user,
    messages,
    inputValue,
    setInputValue,
    isModalOpen,
    setIsModalOpen,
    chatContentDiv,
    handleSubmit,
    handleDelete,
  } = useChat();
  {
    /* TODO: 채팅창 내부 디자인 시안 반영하기 */
  }
  return (
    <>
      <div id="container" className="h-[453px] w-full flex-col justify-start items-start inline-flex">
        <div
          id="header"
          className="self-stretch h-16 p-5 bg-[#141415] rounded-tl-[20px] rounded-tr-[20px] flex-col justify-center items-center flex"
        >
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-center items-center gap-1 flex">
              <div className="w-6 h-6 p-1 justify-center items-center flex">
                <div className="flex-col justify-center items-center inline-flex text-fontWhite">
                  <Image src="/Chat/people.svg" width={16} height={12} alt="사람 모양 아이콘" />
                </div>
              </div>
              <div className="text-fontWhite text-base font-normal font-['Pretendard'] leading-[21px]">
                실시간 채팅에 참여해보세요
              </div>
            </div>
            <div className="w-6 h-6 rounded-md justify-center items-center gap-1 flex">
              <div className="justify-center items-center flex">
                <div className="w-5 h-5 p-1 justify-center items-center flex"></div>
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
                        {dayjs(message.sent_at).format("YY.MM.DD HH:mm")}
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
                              src={message.Users?.profile_image_url ?? "/assets/header/user.svg"}
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
                          {message.Users?.nickname}
                        </div>
                        <div className="w-full p-3 bg-[#323334] rounded-tl rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] justify-center items-center gap-2.5 inline-flex">
                          <div className="w-full text-[#f7f7f7] text-sm font-normal font-['Pretendard'] leading-snug whitespace-pre-wrap break-words overflow-hidden">
                            {message.content}
                          </div>
                        </div>
                        <div className="mt-1 self-stretch text-[#919191] text-xs font-normal font-['Pretendard'] leading-none">
                          {dayjs(message.sent_at).format("YY.MM.DD HH:mm")}
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
                <style jsx>{`
                  .custom-textarea:focus {
                    outline: none;
                    border-color: #c3e88d; /* 인풋아웃라인컬러 */
                  }
                `}</style>
                <textarea
                  onChange={(evt) => setInputValue(evt.target.value)}
                  value={inputValue}
                  placeholder="메시지를 입력해보세요"
                  className="custom-textarea border mr-4 self-stretch w-full h-full p-5 bg-[#141415] text-fontWhite rounded-bl-[20px] rounded-br-[20px] flex-col justify-center items-center flex overflow-auto scrollbar-hide resize-none"
                />

                <div className="justify-center items-center flex">
                  <div className="w-5 h-5 p-1 justify-center items-center flex">
                    <div className="justify-center items-center flex">
                      <button
                        className={`ml-1 text-fontWhite ${!inputValue ? "hidden" : ""}`}
                        style={{ width: "19px", height: "19px" }}
                      >
                        <div className="flex w-full h-full justify-center items-center">
                          <Image src="/assets/send.svg" alt="전송 버튼" width={30} height={30} />
                        </div>
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
    </>
  );
};

export default Chat;
