"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import CommonModal from "@/components/Common/Modal/CommonModal";

const ModalContext = createContext({
  openModal: (content: ReactNode) => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <CommonModal isOpen={isModalOpen} onRequestClose={closeModal}>
        {modalContent}
      </CommonModal>
    </ModalContext.Provider>
  );
};

export default ContextProvider;
