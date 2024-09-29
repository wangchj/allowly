import React from "react";
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import migrate from './migrations/2024-09-26.js';

await migrate();

createRoot(document.getElementById('root')).render(<App/>);
