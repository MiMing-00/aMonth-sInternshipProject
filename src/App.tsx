import { RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import router from "./shared/Router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
