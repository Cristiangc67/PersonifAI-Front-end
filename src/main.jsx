import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router";

import LoginPage from "./pages/LoginPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PlansPage from "./pages/PlansPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UserEdit from "./pages/UserEdit.jsx";
import NotFound from "./pages/NotFound.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import ImagePage from "./pages/ImagePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreateCharacterPage from "./pages/CreateCharacterPage.jsx";
import CharacterPage from "./pages/CharacterPage.jsx";
import Forbidden from "./pages/Forbidden.jsx";
import MasksPage from "./pages/MasksPage.jsx";
import Chattest from "./pages/Chattest.jsx";

const root = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/user/:id", element: <ProfilePage /> },
      { path: "/user/:id/edit", element: <UserEdit /> },
      { path: "/user/:id/masks", element: <MasksPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/library", element: <LibraryPage /> },
      //{ path: "/chat", element: <ChatPage /> },
      { path: "/plans", element: <PlansPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/image", element: <ImagePage /> },
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
