import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";
import Login from "../pages/Login";
import Layout from "../Layout";

// react router dom v-6.27 고정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/myPage", element: <MyPage /> },
    ],
  },
]);

export default router;
