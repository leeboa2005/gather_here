import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

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
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      }}
      formats={["header", "font", "size", "bold", "italic", "underline", "strike", "list", "bullet", "link", "image"]}
      placeholder="내용을 입력해주세요"
    />
  );
};

export default ReactQuillEditor;
