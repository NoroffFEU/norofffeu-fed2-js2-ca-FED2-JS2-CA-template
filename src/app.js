import "./css/style.css";

import router from "./js/router";

import { setLogoutListener } from "./js/ui/global/logout";
import { handleSearchInput } from "./js/utilities/searchUtils";


await router(window.location.pathname);
const searchInput = document.getElementById('searchInput');
if (searchInput){
    searchInput.addEventListener('keypress', handleSearchInput)
}

setLogoutListener();
