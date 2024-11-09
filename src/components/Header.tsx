import { useEffect, useState } from "react";
import useAuthStore, { UserInfo } from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Header = () => {
  const {
    loadSessionToken,
    accessToken,
    userInfo,
    setUserInfo,
    removeAccessToken,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      await loadSessionToken();
      setIsLoading(false);
    };

    initAuth();
  }, []);

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

  const handleLogOut = () => {
    Swal.fire({
      title: "로그아웃 하시겠어요?",
      showDenyButton: true,
      confirmButtonText: "로그아웃",
      denyButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) removeAccessToken();
      setUserInfo(null as unknown as UserInfo);
      navigate("/login");
    });
  };

  return (
    <div className="flex justify-between items-center m-4">
      <Link to="/">한달인턴과제</Link>
      <div className="flex gap-4">
        <div>
          {userInfo ? (
            <Link to="/myPage">{userInfo.nickname}님</Link>
          ) : (
            <Link to="/signUp">회원가입</Link>
          )}
        </div>
        <div>
          {userInfo ? (
            <span onClick={handleLogOut} className="cursor-pointer">
              로그아웃
            </span>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
