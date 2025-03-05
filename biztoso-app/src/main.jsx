import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";

const RegisterForm = lazy(() => import("./components/RegisterForm.jsx"));
const LoginForm = lazy(() => import("./components/LoginForm.jsx"));
const Room = lazy(() => import("./components/socket-chat/Room.jsx"));
// const Chat = lazy(() => import("./components/socket-chat/Chat.jsx"));
const MarketplaceListings = lazy(() =>
  import("./components/MarketplaceListings.jsx")
);
const LeadsList = lazy(() => import("./components/LeadsList.jsx"));

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <RegisterForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/join-room", element: <Room /> },
  // { path: "/chat", element: <Chat /> },
  { path: "/market", element: <MarketplaceListings /> },
  { path: "/leads", element: <LeadsList /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense
        fallback={<div className="text-center text-xl mt-10">Loading...</div>}
      >
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
