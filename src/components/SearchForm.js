import PartySelect from "./selects/PartySelect";
import RegexSelect from "./selects/RegexSelect";
import SearchSelect from "./selects/SearchSelect";
import SubmitButton from "./SubmitButton";
import htw_logo from "../htw_logo.jpg";
function SearchForm() {
  return (
    <div className="logoAndSearch">
      <img src={htw_logo} alt="logo"></img>
      <form className="form">
        <SearchSelect />
        <input type="text" />
        <PartySelect />
        <br />
        <RegexSelect />
        <br />
        
        <br />
        <SubmitButton />
      </form>
    </div>
  );
}

export default SearchForm;
