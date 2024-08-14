import React, { FC, ReactNode } from "react";
import ReactModal from "react-modal";
import Modal from "react-modal";

interface ChatModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const customStyle: ReactModal.Styles = {
  overlay: {},
  content: {
    zIndex: "10",
    position: "fixed", // Change from absolute to fixed
    bottom: "100px", // Adjust based on your button’s position
    right: "20px", // Adjust based on your button’s position
    transform: "none", // No need for translate transform
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    width: "375px", // Set width as needed
    maxWidth: "100%", // Ensure it doesn’t overflow the viewport
    height: "auto", // Adjust as needed
    overflow: "auto",
  },
};

const ChatModal: FC<ChatModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen} // 모달 열려있는지 여부 결정
      onRequestClose={onRequestClose} // 모달 닫는 함수
      style={customStyle}
      shouldCloseOnOverlayClick={false} // 바깥 영역 클릭시 닫힘모드
      className="flex items-center justify-center z-10"
      overlayClassName="flex items-center justify-center z-10"
      contentLabel="모달"
    >
      <div className="relative bg-fillStrong rounded-lg p-8 max-w-lg mx-auto">
        {/* 모달 닫기 버튼 */}
        {/* TODO: 채팅창 내부 디자인 시안 반영하기 */}
        {/* <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="모달 닫기 버튼"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}
        {children}
      </div>
    </Modal>
  );
};

export default ChatModal;
