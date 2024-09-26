import router from "@router/index";
import { loadLogo } from "./components/logo";
import { loadSearchInput } from "./js/ui/search/searchInputLoader";
import { loadLogoutButton } from "./components/buttons/LogoutButton";

async function loadApp() {
  await router(window.location.pathname);
  loadLogo();
  loadSearchInput();
  loadLogoutButton();
}

loadApp();
