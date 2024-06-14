import apiAppointment from "@/apiRequest/ApiAppointment";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useQuery} from "@tanstack/react-query";

const useQueryGetListAppointment = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_APPOINTMENT],
    queryFn: async () => await apiAppointment.getFullAppointments(),
  });
};

export {useQueryGetListAppointment};
