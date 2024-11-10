import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const navigate = useNavigate();

  const signUpSchema = z.object({
    email: z.string().email("올바른 이메일 주소를 입력하세요."),
    password: z
      .string()
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        "비밀번호는 영문 대소문자를 모두 포함해야 합니다."
      )
      .regex(/\d/, "비밀번호는 숫자를 포함해야 합니다."),
    nickname: z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다."),
  });

  const NavigateLogin = () => {
    navigate("/login");
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password || !nickname) {
      Swal.fire({
        text: "빈 칸을 모두 입력해주세요!",
        icon: "error",
      });
      return;
    }

    try {
      signUpSchema.parse({ email, password, nickname });

      const userSingUpData = {
        id: email,
        password,
        nickname,
      };

      const res = await fetch("https://moneyfulpublicpolicy.co.kr/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSingUpData),
      });
      const data = await res.json();
      console.log(data);

      // 중복 아이디 확인
      if (res.status === 409) {
        Swal.fire({
          text: "이미 존재하는 이메일입니다. 다른 이메일을 시도해주세요.",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "회원가입을 축하합니다!",
        text: `${nickname} 님 로그인 부탁드려요!`,
        icon: "success",
      });
      NavigateLogin();
    } catch (error) {
      console.log("실패", error);
      if (error instanceof z.ZodError) {
        Swal.fire({
          text: error.errors[0].message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center text-center items-center gap-4 p-4">
      <h1 className="font-bold text-[#d6bb61]">SIGN UP FORM</h1>
      <div className="h-32 flex flex-col justify-center gap-3">
        <div className="text-xl font-extrabold">
          한 달 인턴 <p>프론트엔드 개발 온보딩 과제</p>
        </div>
        <div className="text-gray-400 text-xs font-semibold">
          유효성 검사를 포함한 회원가입 기능
        </div>
      </div>
      <form onSubmit={handleSignUp} className="flex flex-col w-2/3 md:w-1/4">
        <input
          type="text"
          placeholder="User name"
          className="m-1 p-3 rounded-sm text-black border-2 border-gray-300"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <input
          type="email"
          placeholder="email@domain.com"
          className="m-1 p-3 rounded-sm text-black border-2 border-gray-300"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="m-1 p-3 rounded-sm text-black border-2 border-gray-300"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="min-h-5 h-5">
          {password && (
            <small className="mt-1 ml-2 text-gray-500 text-xs flex flex-col gap-2">
              <div>비밀번호는 최소 6자 이상이어야 하며, </div>
              <div>비밀번호는 영문 대소문자를 모두 포함해야 합니다.</div>
            </small>
          )}
        </div>
        <div className="flex gap-4 items-center mt-10 ml-2 justify-center">
          <Link to="/login" className="font-bold hover:text-[#c1a48c]">
            LOGIN로 이동
          </Link>
          <div> | </div>
          <button
            type="submit"
            className="bg-[#D1C6A1] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#C2B38A] transition duration-300"
          >
            SIGN IN
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
