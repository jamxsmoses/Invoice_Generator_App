import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import { NotFound } from "./components/NotFound";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Signup />,
//     // errorElement: <NotFound />,
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App";
// // import { NotFound } from "./components/NotFound";
// // import { createBrowserRouter, RouterProvider } from "react-router-dom";

// // const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <Signup />,
// //     // errorElement: <NotFound />,
// //   },
// // ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
