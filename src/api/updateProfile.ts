import axios from "axios";

export const updateProfile = async ({
  nickname,
  avatar,
  accessToken,
}: {
  nickname: string;
  avatar?: string | File | null;
  accessToken: string | null;
}) => {
  const formData = new FormData();
  formData.append("nickname", nickname);
  if (avatar) formData.append("avatar", avatar);

  const response = await axios.patch(
    "https://moneyfulpublicpolicy.co.kr/profile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export default updateProfile;
