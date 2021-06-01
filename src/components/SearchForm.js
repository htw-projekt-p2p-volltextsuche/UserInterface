import AddSearchButton from "./AddSearchButton";
import SearchSelect from "./selects/SearchSelect";
import SubmitButton from "./SubmitButton";
import RegexSelect from "./selects/RegexSelect";
function SearchForm(params) {
  return (
    <div className="formContainer">
      <form className="form">
        <SearchSelect />
        <input type="text" />
        <br/>
        <RegexSelect/>
        <SearchSelect />
        <input type="text" />

        <RegexSelect/>
        <SearchSelect />
        <input type="text" />

        <AddSearchButton/>
        <SubmitButton />
      </form>
    </div>
  );
}

export default SearchForm;
