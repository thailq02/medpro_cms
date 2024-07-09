import dynamic from "next/dynamic";
import "./index.scss";
import {QuillProps} from "./react-quill-custom";
const ReactQuillCustom = dynamic(() => import("./react-quill-custom"), {
  ssr: false,
});

export default function TextEditorGlobal({
  value,
  onChange,
  ...props
}: QuillProps) {
  return <ReactQuillCustom value={value} onChange={onChange} {...props} />;
}
