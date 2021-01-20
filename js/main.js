// import functions
import {
  clearSearchText,
  clearPushListener,
  setSearchFocus,
  showClearTextButton,
} from "./searchBar.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from "./searchResults.js";
////////////////////////

document.addEventListener("readystatechange", (event) => {
  // page has loaded everything and ready to init the app
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  // set the focus
  // using imported function
  setSearchFocus();

  // listeners clear text
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  // defining clear
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  // listener on the form (listen for submit)
  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
};

// submitTheSearch
// the procedural "workflow" function - calls other functions in order that we need them
const submitTheSearch = (event) => {
  // form reloads the page, so we dont want that
  event.preventDefault();
  // TODO: delete search results to display new search results
  deleteSearchResults();
  // process the search
  processTheSearch();
  // set the focus
  setSearchFocus();
};

// procedural
// async function - start interacting with wikipedia API
const processTheSearch = async () => {
  //clear the stats line
  clearStatsLine();

  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  // search results
  if (resultArray.length) buildSearchResults(resultArray);
  // set stats line
  setStatsLine(resultArray.length);
};
