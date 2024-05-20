import QUERY_KEY from "@/config/QUERY_KEY";
import {useQuery} from "@tanstack/react-query";
import ApiUser from "@/apiRequest/ApiUser";

const useQueryGetMe = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_DATA_USER_IN_USE],
    queryFn: () => ApiUser.getMe(),
  });
};

export {useQueryGetMe};
