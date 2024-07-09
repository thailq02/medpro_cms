import {modules} from "@/components/TextEditorGlobal/configQuill";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export type QuillProps = React.ComponentProps<typeof ReactQuill>;

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "code-block",
  "indent",
  "list",
  "direction",
  "align",
  "link",
  "image",
  "video",
  "formula",
];

export default function ReactQuillCustom({
  value,
  onChange,
  ...props
}: QuillProps) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      formats={formats}
      modules={modules}
      placeholder="Nhập nội dung..."
      {...props}
    />
  );
}
