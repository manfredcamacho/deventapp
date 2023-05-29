import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.scss";
import { deventapp_backend } from "../../declarations/deventapp_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await deventapp_backend.greet(name);

  button.removeAttribute("disabled");

  document.getElementById("greeting").innerText = greeting;

  return false;
});

const root = createRoot(document.getElementById("app"));
root.render(<App />);
