import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import "./custom-quill.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ReactQuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "list",
        "bullet",
        "link",
        "image",
      ]}
      placeholder="내용을 입력해주세요"
    />
  );
};

export default ReactQuillEditor;
