import { searchService } from "../../api/index";

let currentQuery = '';
let currentPage = 1;
let totalPage = 1;
let isLoading = false;

document.addEventListener('DOMContentLoaded', () => {
    const query = getQueryFromUrl();
    if(query){
        currentQuery = query
        performSearch(query)
    }
})

function getQueryFromUrl(){
    const urlParams= new URLSearchParams(window.location.search)
    const query = urlParams.get('q');
    return query;
}

async function performSearch(query, page=1){
    if(query){
        isLoading = true;
        currentQuery = query
        displaySearchQuery(currentQuery)
        try{

        }catch(error){

        }
    }
}

function displaySearchQuery(query){
    const resultContainer = document.querySelector('.search-result-container');
    const existingHeader = document.querySelector('.search-header')

    if(existingHeader){
        existingHeader.remove();
    }

    const searchHeader = document.createElement("h2");
    searchHeader.className = 'search-header';
    searchHeader.textContent = `Search result for: ${query}`;

    resultContainer.parentNode.insertBefore(searchHeader, resultContainer)
}
