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
      confirmButtonColor: "#D1C6A1",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAccessToken();
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        navigate("/login");
      }
    });
  };

  return (
    <div className="relative flex justify-between items-center font-bold w-full m-4">
      <Link to="/" className="hover:text-[#c1a48c]">
        한 달 인턴
      </Link>
      <div className="hidden absolute left-1/2 transform -translate-x-1/2 md:block">
        Become a Front-End Developer
      </div>
      <div className="flex gap-4 mr-10">
        <div>
          {data ? (
            <Link to="/myPage" className="hover:text-[#c1a48c]">
              {data.nickname}님
            </Link>
          ) : (
            <Link to="/signUp" className="hover:text-[#c1a48c]">
              회원가입
            </Link>
          )}
        </div>
        <div>
          {data ? (
            <span
              onClick={handleLogOut}
              className="cursor-pointer hover:text-[#c1a48c]"
            >
              로그아웃
            </span>
          ) : (
            <Link to="/login" className="hover:text-[#c1a48c]">
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
