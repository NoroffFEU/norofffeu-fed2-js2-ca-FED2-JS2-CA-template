import { authGuard } from "../../utilities/authGuard";
import { handleSearchInput } from "../../utilities/searchUtils";

authGuard();

function initSearch(){
    const searchInput = document.getElementById('SearchInput');
    if(searchInput){
        searchInput.addEventListener('keydown', handleSearchInput);
    }else{
        console.error('Search input element not found');
    }
}

document.addEventListener('DOMContentLoaded', initSearch);