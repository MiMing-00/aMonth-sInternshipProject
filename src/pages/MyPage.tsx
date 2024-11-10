import React, { useState } from "react";
import useAuthStore from "../stores/authStore";
import Swal from "sweetalert2";
import useFetchUserInfo from "../hooks/useFetchUserInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProfile from "../api/updateProfile";
import LoadingSpinner from "../components/LoadingSpinner";

const MyPage: React.FC = () => {
  const { accessToken } = useAuthStore();
  const { data, isLoading } = useFetchUserInfo(accessToken);
  const queryClient = useQueryClient();
  const [myPageNickname, setMyPageNickname] = useState<string>(
    data?.nickname || ""
  );
  const [MyPageAvatar, setMyPageAvatar] = useState<string | File | null>(
    data?.avatar || null
  );

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    const MAX_FILE_SIZE = 1 * 1024 * 1024;

    // 몇이 될지 확인해보기...
    if (file && file.size > MAX_FILE_SIZE) {
      Swal.fire({
        title: "파일의 크기가 너무 큽니다!",
        text: "다른 파일로 시도해 주세요.",
        icon: "error",
      });
      return;
    }

    setMyPageAvatar(file);
  };

  const mutate = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updateData) => {
      console.log(updateData);
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      Swal.fire({
        title: "변경 완료!",
        icon: "success",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUserInfo = (event: React.FormEvent) => {
    event.preventDefault();
    mutate.mutate({
      nickname: myPageNickname,
      avatar: MyPageAvatar,
      accessToken,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col justify-center items-center text-center p-6 mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {data?.nickname}님의 마이페이지
      </h1>
      <form onSubmit={handleUserInfo} className="w-full space-y-6">
        <div className="flex flex-col items-center">
          {MyPageAvatar ? (
            <img
              src={
                typeof MyPageAvatar === "string"
                  ? MyPageAvatar
                  : URL.createObjectURL(MyPageAvatar)
              }
              alt={`${data?.nickname}의 아바타`}
              width="128"
              height="128"
              className="rounded-full mb-4"
            />
          ) : (
            <div className="w-32 h-32 border-2 border-gray-300 rounded-full mb-4"></div>
          )}
          <input
            type="file"
            name="avatar"
            onChange={handleAvatarChange}
            className="border-2 border-gray-300 p-2 rounded-sm text-sm text-gray-700 cursor-pointer"
          />
        </div>
        <div className="flex flex-row gap-4 items-center justify-center w-full">
          <label className="text-sm font-semibold text-gray-700">닉네임:</label>
          <input
            type="text"
            name="nickname"
            value={myPageNickname}
            onChange={(event) => setMyPageNickname(event.target.value)}
            placeholder="닉네임을 입력하세요"
            className="border-2 border-gray-300 p-3 rounded-md w-2/3 md:w-1/4"
          />
        </div>
        <button
          type="submit"
          className="bg-[#D1C6A1] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#C2B38A] transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default MyPage;
