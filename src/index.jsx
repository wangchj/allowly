import React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import migrate from './migrations/2024-09-26.js';
import RootLayout from "ui/layout/root-layout.jsx";
import Currencies from "ui/screens/currencies";
import Main from 'ui/screens/main';
import Settings from "ui/screens/settings";

const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        element: <Main/>
      },
      {
        path: '/settings',
        element: <Settings/>
      },
      {
        path: '/currencies',
        element: <Currencies/>
      },
    ]
  }
]);

await migrate();


// createRoot(document.getElementById('root')).render(<App/>);

createRoot(document.querySelector('#root')).render(
  <RouterProvider router={router} />
);
