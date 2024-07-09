import store from "@/redux/store";
import {Quill} from "react-quill";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageUploader from "quill-image-uploader";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageResize from "quill-image-resize-module-react";
import "quill-image-uploader/dist/quill.imageUploader.min.css";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

const {user} = store.getState();
const access_token = user?.access_token;
export const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{header: 1}, {header: 2}], // custom button values
    [{list: "ordered"}, {list: "bullet"}],
    [{indent: "-1"}, {indent: "+1"}], // outdent/indent
    [{direction: "rtl"}], // text direction
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    [{font: []}],
    [{align: []}],
    ["link", "image", "video"],
    [{color: []}],
  ],
  imageUploader: {
    upload: (file: any) => {
      return new Promise((resolve, reject) => {
        console.log("imageUploader", file);
        const formData = new FormData();
        formData.append("image", file);
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/medias/upload-image`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            const newImages = result?.data.map(
              (i: {type: number; url: string}) => i.url,
            );
            resolve(newImages);
          })
          .catch((error) => {
            reject("Upload failed");
            console.error("Error:", error);
          });
      });
    },
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
    displaySize: true,
  },
};

declare global {
  interface Window {
    Quill: any;
  }
}
