import { authGuard } from "../../utilities/authGuard.js";

export default function homeView() {
  console.log('Home view loaded');
  authGuard();
  // Add your home page logic here
}