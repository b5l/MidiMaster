import { createRoot } from "react-dom/client";

import Grid from "./components/Grid";
import layout from "../test-layout";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<Grid layout={layout} />);
