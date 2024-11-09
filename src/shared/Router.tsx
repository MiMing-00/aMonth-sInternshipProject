import {
  createBrowserRouter,
  LoaderFunction,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";
import Login from "../pages/Login";
import Layout from "../Layout";

const checkLoginStatus: LoaderFunction = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
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
      { path: "/signUp", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      {
        path: "/myPage",
        element: <MyPage />,
        loader: checkLoginStatus,
        errorElement: <Navigate to="/" />,
      },
    ],
  },
]);

export default router;
