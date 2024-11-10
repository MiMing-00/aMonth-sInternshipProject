import GitHub from "../assets/GitHub.png";
import Velog from "../assets/Velog.jfif";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center gap-4 bg-[#E2DED1] h-auto p-4">
      <div className="flex gap-4 justify-center items-center">
        <a
          href="https://github.com/MiMing-00"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={GitHub} alt="깃허브" width={30} height={30} />
        </a>
        <a
          href="https://velog.io/@miming-00"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Velog} alt="벨로그" width={30} height={30} />
        </a>
      </div>
      <div className="flex justify-between font-bold">
        <div>Thank you for visiting</div>
        <div>Made with ❤️ by CHOI HYEMI</div>
      </div>
    </footer>
  );
};

export default Footer;
