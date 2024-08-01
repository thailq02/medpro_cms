"use client";
import {IMAGE_FORMATS_ACCEPTED} from "@/utils/constants/regexValidation";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import type {UploadProps} from "antd";
import {Upload} from "antd";
import {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";
import {useCallback, useEffect, useState} from "react";
import "./index.scss";

interface IUploadImageGlobalProps {
  type?: "thumbnail" | "avatar" | "multiple";
  url?: string;
  label?: string;
  onChange?: (a: RcFile | RcFile[]) => void;
  classNames?: string;
}

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const MaxMultiImage = 10;

export default function UploadImageGlobal({
  type,
  label,
  url,
  onChange,
  classNames = "",
}: IUploadImageGlobalProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setImageUrl(url);
  }, [url]);

  const isMultipleUpload = type === "multiple";
  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.fileList) {
      setFileList(info.fileList);
      info.fileList.forEach((file) => {
        getBase64(file.originFileObj as RcFile, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
        if (file.originFileObj && onChange) {
          if (isMultipleUpload) {
            onChange(info.fileList.map((val) => val.originFileObj) as RcFile[]);
          } else {
            onChange(file.originFileObj as RcFile);
          }
        }
      });
    }
  };

  const uploadButton = (
    <button style={{border: 0, background: "none"}} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>Upload</div>
    </button>
  );

  const ImageAvatar = useCallback(() => {
    return imageUrl ? (
      <img src={imageUrl} alt="avatar" className="object-contain h-full" />
    ) : (
      uploadButton
    );
  }, [imageUrl]);

  return (
    <>
      <div className={`font-medium ${type === "thumbnail" ? "mb-5" : "mb-2"}`}>
        {label}
      </div>
      <Upload
        multiple={isMultipleUpload}
        style={{width: "200px"}}
        name="avatar"
        listType="picture-card"
        className={`${type === "thumbnail" ? "image-thumbnail" : "avatar-uploader"} ${classNames}`}
        accept={IMAGE_FORMATS_ACCEPTED.join(",")}
        showUploadList={isMultipleUpload}
        beforeUpload={() => false}
        onChange={handleChange}
      >
        {isMultipleUpload ? (
          fileList?.length < MaxMultiImage && "+ Upload"
        ) : (
          <ImageAvatar />
        )}
      </Upload>
    </>
  );
}
