import React, { useState, useEffect } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const MyPage: React.FC = () => {
  const { userInfo } = useAuthStore();
  const [myPageNickname, setMyPageNickname] = useState<string>(
    userInfo?.nickname || ""
  );
  const [MyPageavatar, setMyPageAvatar] = useState<string | null>(
    userInfo?.avatar || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setMyPageNickname(userInfo.nickname);
      setMyPageAvatar(userInfo.avatar);
    }
  }, [userInfo]);

  return (
    <div className="flex flex-col justify-center text-center">
      <h1>{myPageNickname}님의 마이페이지</h1>
      <div>
        <label>닉네임:</label>
        <input
          type="text"
          value={myPageNickname}
          onChange={(event) => setMyPageNickname(event.target.value)}
          placeholder="닉네임을 입력하세요"
          className="border-2"
        />
      </div>
      <div>
        <label>아바타:</label>
        <input type="file" />
        // {MyPageavatar && <img src={MyPageavatar} alt="Avatar" width={100} />}
      </div>
    </div>
  );
};

export default MyPage;
