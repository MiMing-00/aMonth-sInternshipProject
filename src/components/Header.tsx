import { useState, useEffect } from "react";
import useAuthStore from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useFetchUserInfo from "../hooks/useFetchUserInfo";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

const Header = () => {
  const { loadSessionToken, accessToken, removeAccessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { data } = useFetchUserInfo(accessToken);
  const queryClient = useQueryClient();

  useEffect(() => {
    const initAuth = async () => {
      await loadSessionToken();
      setIsLoading(false);
    };

    initAuth();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleLogOut = () => {
    Swal.fire({
      title: "로그아웃 하시겠어요?",
      showDenyButton: true,
      confirmButtonText: "로그아웃",
      denyButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAccessToken();
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex justify-between items-center m-4">
      <Link to="/">한달인턴과제</Link>
      <div className="flex gap-4">
        <div>
          {data ? (
            <Link to="/myPage">{data.nickname}님</Link>
          ) : (
            <Link to="/signUp">회원가입</Link>
          )}
        </div>
        <div>
          {data ? (
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
