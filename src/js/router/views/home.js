import { authGuard } from "../../utilities/authGuard";

authGuard();

export default function home() {
  console.log("Home page loaded");
  // Your home page logic here
}
