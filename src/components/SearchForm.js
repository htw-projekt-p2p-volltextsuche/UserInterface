import PartySelect from "./selects/PartySelect";
import RegexSelect from "./selects/RegexSelect";
import SearchSelect from "./selects/SearchSelect";

function SearchForm() {
  return (
    <div className="form">
      <form>
        <SearchSelect />
        <input type="text" />
        <br />
        <RegexSelect />
        <br />
        <SearchSelect />
        <PartySelect />
        <br />
        <input type="submit" value="Suche"></input>
      </form>
    </div>
  );
}

export default SearchForm;
