import FormRow from "./FormRow";
import { useState } from "react";
import FormMainRow from "./FormMainRow";

function SearchForm(params) {
  const [inputList, setInputList] = useState([]);

  return (
    <div className="formContainer">
      <form className="form">
        <div className="formHeader">
          <FormMainRow />
          <input
            type="button"
            id="addSearchButton"
            value="+"
            onClick={addFormRow}
          ></input>
        </div>
        {inputList}
        <input type="submit" id="formSubmit"value="Suche"></input>
      </form>
    </div>
  );

  function addFormRow(params) {
    setInputList(inputList.concat(<FormRow />));
  }
}
export default SearchForm;
