"use client";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastcancel from "/public/assets/toastcancel.svg";
import toastcheck from "/public/assets/toastcheck.svg";

type ToastProps = {
  state: string;
  message: string;
  onClear?: () => void;
};

const Toast: React.FC<ToastProps> = ({ state, message, onClear }) => {
  useEffect(() => {
    if (state && message) {
      const notify = () => {
        switch (state) {
          case "error":
            toast.error(message, {
              icon: <img src={toastcancel.src} width={24} height={24} alt="에러 알림 아이콘" />,
              style: {
                background: "#141415",
                color: "#f7f7f7",
                fontWeight: "500",
                border: "1px solid #FF3F02",
                wordBreak: "keep-all",
              },
              progressStyle: {
                background: "#FF3F02",
              },
              closeButton: true,
            });
            break;
          case "warn":
            toast.warn(message, {
              style: {
                background: "#141415",
                color: "#f7f7f7",
                fontWeight: "500",
                border: "1px solid #fac66a",
                wordBreak: "keep-all",
              },
              progressStyle: {
                background: "#fac66a",
              },
              closeButton: true,
            });
            break;
          case "info":
            toast.info(message, {
              style: {
                background: "#141415",
                color: "#f7f7f7",
                fontWeight: "500",
                border: "1px solid #82aaff",
                wordBreak: "keep-all",
              },
              progressStyle: {
                background: "#82aaff",
              },
              closeButton: true,
            });
            break;
          case "success":
            toast.success(message, {
              icon: <img src={toastcheck.src} width={24} height={24} alt="성공 알림 아이콘" />,
              style: {
                background: "#141415",
                color: "#f7f7f7",
                fontWeight: "500",
                border: "1px solid #c3e88d",
                wordBreak: "keep-all",
              },
              progressStyle: {
                background: "#c3e88d",
              },
              closeButton: true,
            });
            break;
          case "custom":
            toast.warn(message, {
              icon: <img src={toastcheck.src} width={24} height={24} alt="커스텀 알림 아이콘" />,
              position: "bottom-right",
              style: {
                background: "#141415",
                color: "#f7f7f7",
                fontSize: "16px",
                wordBreak: "keep-all",
              },
              progressStyle: {
                background: "#faa6c9",
                borderStyle: "none",
              },
              closeButton: true,
            });
            break;
          default:
            break;
        }
      };

      try {
        notify();
      } catch (error) {
        console.error("Toast 오류:", error);
      }

      // 3초 후에 토스트 상태 초기화
      if (onClear) {
        const timer = setTimeout(onClear, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [state, message, onClear]);

  return (
    <div>
      <ToastContainer
        limit={1}
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Toast;
