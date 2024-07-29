import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ReactQuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder: string; // placeholder 속성을 추가합니다.
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "list", "bullet", "link", "image"];

const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({ value, onChange, placeholder }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder} // placeholder를 여기에 추가합니다.
    />
  );
};

export default ReactQuillEditor;
