import { createBrowserRouter, LoaderFunction } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";
import Login from "../pages/Login";
import Layout from "../Layout";

const checkLoginStatus: LoaderFunction = async ({ request }) => {
  const token = sessionStorage.getItem("accessToken");
  const pathname = new URL(request.url).pathname;

  if ((token && pathname === "/login") || (token && pathname === "/signUp")) {
    throw new Response("홈으로 이동", {
      status: 302,
      headers: { Location: "/" },
    });
  }

  if (!token && pathname === "/myPage") {
    throw new Response("인증 후 접속", {
      status: 302,
      headers: { Location: "/" },
    });
  }
  return token;
};

// react router dom v-6.27 고정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signUp", element: <SignUp />, loader: checkLoginStatus },
      { path: "/login", element: <Login />, loader: checkLoginStatus },
      {
        path: "/myPage",
        element: <MyPage />,
        loader: checkLoginStatus,
      },
    ],
  },
]);

export default router;
