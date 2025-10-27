import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {Toaster} from "react-hot-toast"
import { Provider } from "react-redux";
import store from "./redux/store/store.js";



createRoot(document.getElementById("root")).render(
    <div className="h-full bg-gray-100">
      <Toaster position="top-right"/>
      {/* <AuthProvider> */}
        <Provider store={store}>
          <App />
        </Provider>
      {/* </AuthProvider> */}
    </div>
);
