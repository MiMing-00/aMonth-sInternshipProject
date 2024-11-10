import { useState } from "react";
import Swal from "sweetalert2";
import useAuthStore from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const { saveInitialLoginInfo, setSessionToken } = useAuthStore();
  const navigate = useNavigate();

  const NavigateHome = () => {
    navigate("/");
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!loginEmail || !loginPassword) {
      Swal.fire({
        text: "빈 칸을 모두 입력해주세요!",
        icon: "error",
      });
      return;
    }

    const userLoginData = {
      id: loginEmail,
      password: loginPassword,
    };

    try {
      const res = await fetch("https://moneyfulpublicpolicy.co.kr/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginData),
      });

      if (res.status === 401) {
        Swal.fire({
          text: "아이디와 비밀번호를 다시 확인해주세요!",
          icon: "error",
        });
        return;
      }

      const data = await res.json();
      saveInitialLoginInfo(data);
      setSessionToken(data.accessToken);

      Swal.fire({
        title: "로그인 되었습니다.",
        text: `홈으로 이동합니다!`,
        icon: "success",
      });

      if (data.success) {
        NavigateHome();
      }
    } catch (error) {
      console.log("실패", error);
    }
  };

  return (
    <div className="flex flex-col justify-center text-center items-center gap-4 p-4 m-4">
      <h1 className="font-bold text-[#d6bb61]">LOGIN FORM</h1>
      <div className="h-32 flex flex-col justify-center gap-3">
        <div className="text-xl font-extrabold">
          한 달 인턴 <p>프론트엔드 개발 온보딩 과제</p>
        </div>
        <div className="text-gray-400 text-xs font-semibold">
          주스탠드와 세션스토리지를 이용한 로그인 기능
        </div>
      </div>
      <form className="flex flex-col w-2/3 md:w-1/4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email@domain.com"
          className="m-1 p-3 rounded-sm text-black"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="m-1 p-3 rounded-sm text-black"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <div className="flex gap-4 items-center mt-10 ml-2 justify-center">
          <Link to="/signUp" className="font-bold hover:text-[#c1a48c]">
            SIGN UP으로 이동
          </Link>
          <div> | </div>
          <button
            type="submit"
            className="bg-[#D1C6A1] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#C2B38A] transition duration-300"
          >
            LOGIN IN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
