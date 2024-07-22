import React from "react";
import Modal from "react-modal";

const CommonModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel="Example Modal"
    >
      <div className="relative bg-white rounded-lg p-8 max-w-lg mx-auto">
        <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default CommonModal;
