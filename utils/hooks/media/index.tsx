import {useMutation} from "@tanstack/react-query";
import ApiUploadImage from "@/apiRequest/ApiUploadImage";

const useUploadImage = () => {
  return useMutation({
    mutationFn: ApiUploadImage.uploadImage,
    onSuccess: () => {
      console.log("Upload image successfully");
    },
  });
};

export {useUploadImage};
