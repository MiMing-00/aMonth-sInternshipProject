import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <address className="border p-4 m-4">
        <h1>CONTACT</h1>
        <div>👋 최혜미</div>
        <div>✉️ c.sera2511@gmail.com</div>
        <div>📞 010-7225-1125</div>
        <div>깃허브</div>
        <div>벨로그</div>
      </address>
      <div>후에에엥 여기 할 거 없다고~~~~~~~~~</div>
      <Link to="/signUp">회원가입</Link>
    </div>
  );
};

export default Home;
