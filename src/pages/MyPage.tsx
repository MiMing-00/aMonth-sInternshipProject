import React, { useState } from "react";
import useAuthStore from "../stores/authStore";
import Swal from "sweetalert2";
import useFetchUserInfo from "../hooks/useFetchUserInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProfile from "../api/updateProfile";

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

  const handleAvatarUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  //스피너로 바꾸기
  if (isLoading) {
    return <div>잠시만용</div>;
  }

  return (
    <div className="flex flex-col justify-center text-center">
      <h1>{data?.nickname}님의 마이페이지</h1>
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
              alt={`${data?.nickname}의 아바타`}
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
  );
};

export default MyPage;
