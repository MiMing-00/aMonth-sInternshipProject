import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const Home: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <div className="flex flex-col mt-3 mx-auto gap-5">
      <address className="bg-slate-100 shadow-lg rounded-xl border p-6 w-full sm:w-2/3 md:w-1/2 mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          CONTACT
        </h1>
        <div className="text-lg text-gray-700 mb-2 flex items-center gap-2 font-semibold">
          <span role="img" aria-label="name">
            👋
          </span>
          최혜미
        </div>
        <div className="text-lg text-gray-700 mb-2 flex items-center gap-2 font-semibold">
          <span role="img" aria-label="email">
            ✉️
          </span>
          c.sera2511@gmail.com
        </div>
        <div className="text-lg text-gray-700 mb-4 flex items-center gap-2 font-semibold">
          <span role="img" aria-label="phoneNumber">
            📞
          </span>
          010-7225-1125 (카카오톡이 안 돼요!)
        </div>
      </address>
      <div className="h-auto min-h-32 bg-[#C7B89A] flex">
        <div className="flex ml-4 font-bold items-start mt-1">
          𝕀𝕥 𝕨𝕚𝕝𝕝 𝕓𝕖 𝕦𝕡𝕕𝕒𝕥𝕖𝕕 𝕤𝕠𝕠𝕟!
        </div>
      </div>
      {accessToken ? (
        <Link
          to="/myPage"
          className="flex justify-center font-bold hover:text-[#c1a48c]"
        >
          My page 로 이동
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
