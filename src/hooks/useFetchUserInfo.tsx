import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../api/user";

const useFetchUserInfo = (accessToken: string | null) => {
  return useQuery({
    queryKey: ["userInfo", accessToken],
    queryFn: () => fetchUserInfo(accessToken),
    enabled: !!accessToken,
  });
};

export default useFetchUserInfo;
