import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const { loadSessionToken, accessToken, userInfo, setUserInfo } =
    useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await loadSessionToken();
      setIsLoading(true);
    };

    initAuth();
  }, [loadSessionToken]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(
          `https://moneyfulpublicpolicy.co.kr/user`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const { data } = response;
        setUserInfo({
          avatar: data.avatar,
          id: data.id,
          nickname: data.nickname,
          success: data.success,
        });
      } catch (error) {
        console.log("실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  if (isLoading) {
    // 돌아가는 거 넣기
    return <div>잠시만용</div>;
  }

  return (
    <div className="flex justify-between items-center m-4">
      <div>한달인턴과제</div>
      <div className="flex gap-4">
        <div>
          {userInfo ? (
            <Link to="/myPage">{userInfo.nickname}님</Link>
          ) : (
            <Link to="/signUp">회원가입</Link>
          )}
        </div>
        <div>
          {userInfo ? <span>로그아웃</span> : <Link to="/login">로그인</Link>}
        </div>
      </div>
    </div>
  );
};

export default Header;
