import PartySelect from "./selects/PartySelect";
import RegexSelect from "./selects/RegexSelect";
import SearchSelect from "./selects/SearchSelect";
import SubmitButton from "./SubmitButton";

function SearchForm() {
  return (
    <div>
      <form className="form">
        <SearchSelect /><label className="tabulator"></label>
        <input type="text" />
        <br />
        <RegexSelect />
        <SearchSelect />
        <input type="text" />
        <br />
        <RegexSelect />
        <SearchSelect />
        <input type="text" />
        <br />
        <SubmitButton />
      </form>
    </div>
  );
}

export default SearchForm;
