import axios from "axios";

export const fetchUserInfo = async (accessToken: string | null) => {
  if (!accessToken) {
    throw new Error("엑세스 토큰 있을 때만 작동합니다!");
  }

  const response = await axios.get(`https://moneyfulpublicpolicy.co.kr/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
