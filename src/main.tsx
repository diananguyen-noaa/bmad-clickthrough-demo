import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BmadDemoPage } from "../BmadDemoPage";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BmadDemoPage />
  </StrictMode>,
);
