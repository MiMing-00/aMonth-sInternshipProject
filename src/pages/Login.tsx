import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuthStore from "../stores/authStore";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const { loginInfo, saveLoginInfo, setSessionToken } = useAuthStore();
  const navigate = useNavigate();

  const NavigateHome = () => {
    navigate("/");
  };

  const loginTest = async (event: React.FormEvent) => {
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
      const data = await res.json();
      saveLoginInfo(data);
      setSessionToken(data.accessToken);

      if (data.success) {
        NavigateHome();
      }
    } catch (error) {
      console.log("실패", error);
    }
  };

  useEffect(() => {
    if (loginInfo) {
      console.log("loginInfo", loginInfo);
    }
  }, [loginInfo]);

  return (
    <form
      className="flex flex-col justify-center text-center items-center al gap-4 border p-4 m-4 bg-black text-white"
      onSubmit={loginTest}
    >
      <h1>LOGIN FORM</h1>
      <div className="border-white border-2 rounded-full w-52 h-52 flex justify-center">
        여기다가 넣을 거 생각하기~!
      </div>
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
      <div className="flex gap-4 items-center">
        <Link to="/signUp"> SIGN UP </Link>
        <button type="submit">LOGIN IN</button>
      </div>
    </form>
  );
};

export default Login;