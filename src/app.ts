import router from "@router/index";
import { loadLogo } from "./components/Logo";
import { loadSearchInput } from "./js/ui/search/searchInputLoader";
import { loadLogoutButton } from "./components/buttons/LogoutButton";
import { loadUserLoggedProfile } from "./js/ui/profile/renderUserProfile";

async function loadApp() {
  await router(window.location.pathname);
  await loadUserLoggedProfile();
  loadLogo();
  loadSearchInput();
  loadLogoutButton();
}

loadApp();
