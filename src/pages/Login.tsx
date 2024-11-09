import { useState } from "react";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  return (
    <div className="flex flex-col justify-center text-center items-center al gap-4 border p-4 m-4 text-center bg-black text-white font-">
      <h1>LOGIN FORM</h1>
      <div className="border-white border-2 rounded-full w-52 h-52 flex justify-center">
        여기다가 넣을 거 생각하기~!
      </div>
      <input
        type="email"
        placeholder="email@domain.com"
        className="m-1 p-3 rounded-sm"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="m-1 p-3 rounded-sm"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button type="submit">
        LOGIN IN
      </button>
    </div>
  );
};

export default Login;
