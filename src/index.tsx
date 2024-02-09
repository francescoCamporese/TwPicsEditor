import ReactDOM from "react-dom/client";
import App from "./App";
import "./input.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

root.render(<App />);
