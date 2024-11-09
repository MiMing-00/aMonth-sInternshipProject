import React, { useState, useEffect, Suspense } from "react";
import useAuthStore from "../stores/authStore";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyPage: React.FC = () => {
  const { userInfo, initialLoginInfo, updateUserInfo, accessToken } =
    useAuthStore();
  const [myPageNickname, setMyPageNickname] = useState<string>(
    userInfo?.nickname || ""
  );
  const [MyPageAvatar, setMyPageAvatar] = useState<string | File | null>(
    userInfo?.avatar || null
  );


  useEffect(() => {
    if (userInfo) {
      setMyPageNickname(userInfo.nickname);
      setMyPageAvatar(userInfo?.avatar);
    }
  }, [userInfo]);

  const handleAvatarUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    setMyPageAvatar(file);
  };

  const handleUserInfo = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nickname", myPageNickname);
    if (MyPageAvatar) formData.append("avatar", MyPageAvatar);

    try {
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
      const { data } = response;
      updateUserInfo(data);

      Swal.fire({
        title: "변경 완료!",
        icon: "success",
      });
      console.log(userInfo);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 413) {
          Swal.fire({
            title: "파일의 크기가 너무 큽니다!",
            text: "다른 파일로 시도해 주세요.",
            icon: "error",
          });
        } else {
          console.log(error.response);
        }
      }
    }
  };

  return (
    <Suspense fallback="잠시만용">
      <div className="flex flex-col justify-center text-center">
        <h1>{userInfo?.nickname}님의 마이페이지</h1>
        <form onSubmit={handleUserInfo}>
          <label>닉네임:</label>
          <input
            type="text"
            name="nickname"
            value={myPageNickname}
            onChange={(event) => setMyPageNickname(event.target.value)}
            placeholder="닉네임을 입력하세요"
            className="border-2"
          />

          <div>
            <label>아바타:</label>
            {MyPageAvatar ? (
              <img
                src={
                  typeof MyPageAvatar === "string"
                    ? MyPageAvatar
                    : URL.createObjectURL(MyPageAvatar)
                }
                alt={`${userInfo?.nickname}의 아바타`}
                width="50"
                height="50"
              />
            ) : (
              <div className="w-32 h-32 border-2 rounded-full bg-gray-200"></div>
            )}
            <input type="file" name="avatar" onChange={handleAvatarUrlChange} />
          </div>
          <button type="submit" className="text-white">
            Save Changes
          </button>
        </form>
      </div>
    </Suspense>
  );
};

export default MyPage;
