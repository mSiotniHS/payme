/* @refresh reload */
import { render } from "solid-js/web";

import "./styles/index.css";
import Main from "./views/Main";

render(() => <Main />, document.getElementById("root") as HTMLElement);
