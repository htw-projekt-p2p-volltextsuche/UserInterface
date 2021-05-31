import PartySelect from "./selects/PartySelect";
import RegexSelect from "./selects/RegexSelect";
import SearchSelect from "./selects/SearchSelect";
import SubmitButton from "./SubmitButton";

function SearchForm(params) {
  return (
    <div className="formContainer">
      <form className="form">
        <SearchSelect />
        <input type="text" />
        <br/>
        <RegexSelect />
        <SubmitButton />
      </form>
    </div>
  );
}

export default SearchForm;
