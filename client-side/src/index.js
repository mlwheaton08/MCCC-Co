import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./FirebaseConfig";
import { MCCCCo } from "./components/MCCCCo";

firebase.initializeApp(firebaseConfig);

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <MCCCCo />
  </BrowserRouter>
)