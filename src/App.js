import ListElement from "./components/ListElement";
import SearchForm from "./components/SearchForm";
import HeaderBanner from "./components/HeaderBanner";
import Pagination from "./components/Pagination";
function App() {
  return (
    <div>
      <HeaderBanner />
      <SearchForm />
      <ListElement />
      <ListElement />
      <ListElement />
      <ListElement />
      <ListElement />
      <Pagination />
    </div>
  );
}

export default App;
