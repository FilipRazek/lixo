import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Game } from "./pages/Game";
import { Lobby } from "./pages/Lobby";
import { Home } from "./pages/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/lobby",
    element: <Lobby />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game/:gameId",
    element: <Game />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
