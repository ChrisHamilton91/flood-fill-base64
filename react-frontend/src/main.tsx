import ReactDOM from "react-dom/client";
import App from "./app";
import { GridCtxProvider } from "./grid-ctx";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GridCtxProvider>
    <App />
  </GridCtxProvider>
);
