import AddSearchButton from "./AddSearchButton";
import SearchSelect from "./selects/SearchSelect";
import SubmitButton from "./SubmitButton";

function SearchForm(params) {
  return (
    <div className="formContainer">
      <form className="form">
        <SearchSelect />
        <input type="text" />
        <br/>
        <AddSearchButton/>
        <SubmitButton />
      </form>
    </div>
  );
}

export default SearchForm;
