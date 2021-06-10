import RegexSelect from "./RegexSelect";
import SearchSelect from "./SearchSelect";

function FormMainRow(params) {
  return (
    <div className="formMainRow">
      <label className="freieSucheLabel">Freie Suche</label>
      <br />
      <input className="mainTextInput" type="text"></input>
    </div>
  );
}
export default FormMainRow;
