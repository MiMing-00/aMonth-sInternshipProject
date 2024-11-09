import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const signUpTest = async () => {
    if (!email || !password || !nickname) {
      Swal.fire({
        text: "빈 칸을 모두 입력해주세요!",
        icon: "error",
      });
      return;
    }

    const userSingUpData = {
      id: email,
      password,
      nickname,
    };

    try {
      const res = await fetch("https://moneyfulpublicpolicy.co.kr/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSingUpData),
      });
      const data = await res.json();
      console.log(data);

      // 성공했다고 알림 하기 혹은 바로 로그인 되게 하기! 혹은 로그인 페이지로 이동
    } catch (error) {
      console.log("실패", error);
    }
  };

  return (
    <div className="flex flex-col justify-center text-center items-center al gap-4 border p-4 m-4 bg-black text-white font-">
      <h1>SIGN UP FORM</h1>
      <div className="border-white border-2 rounded-full w-52 h-52 flex justify-center">
        여기다가 넣을 거 생각하기~!
      </div>
      <input
        type="text"
        placeholder="User name"
        className="m-1 p-3 rounded-sm text-black"
        value={nickname}
        onChange={(event) => setNickname(event.target.value)}
      />
      <input
        type="email"
        placeholder="email@domain.com"
        className="m-1 p-3 rounded-sm text-black"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="m-1 p-3 rounded-sm text-black"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <div className="flex gap-4 items-center">
        <Link to="/login"> LOGIN </Link>
        <button type="submit" onClick={signUpTest}>
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default SignUp;