import ApiUploadImage from "@/apiRequest/ApiUploadImage";
import {useMutation} from "@tanstack/react-query";

const useUploadImage = () => {
  return useMutation({
    mutationFn: ApiUploadImage.uploadImage,
    onSuccess: () => {
      console.log("Upload image successfully");
    },
  });
};

export {useUploadImage};
