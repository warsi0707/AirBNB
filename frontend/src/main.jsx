import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import AuthProvider from "./context/authProvider.jsx";
import {Toaster} from "react-hot-toast"
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RecoilRoot>
    <div className="h-full bg-gray-100">
      <Toaster position="top-right"/>
      <AuthProvider>
        <App />
      </AuthProvider>
    </div>
  </RecoilRoot>

  // </StrictMode>,
);
