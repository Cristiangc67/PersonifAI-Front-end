import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router";

import LoginPage from "./pages/LoginPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import PlansPage from "./pages/PlansPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreateCharacterPage from "./pages/CreateCharacterPage.jsx";
import CharacterPage from "./pages/CharacterPage.jsx";
import Forbidden from "./pages/Forbidden.jsx";
import MasksPage from "./pages/MasksPage.jsx";
import HomeNew from "./pages/HomeNew.jsx";
import UserEditNew from "./pages/UserEditNew.jsx";

const root = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomeNew /> },
      { path: "/user/:id", element: <ProfilePage /> },
      { path: "/user/:id/edit", element: <UserEditNew /> },
      { path: "/user/:id/masks", element: <MasksPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/library", element: <LibraryPage /> },
      { path: "/plans", element: <PlansPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/character/:id", element: <CharacterPage /> },
      { path: "/create-character", element: <CreateCharacterPage /> },
      { path: "/character/:id/edit", element: <CreateCharacterPage /> },
      { path: "/chat/:id", element: <ChatPage /> },
      { path: "/forbidden", element: <Forbidden /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
