import RegexSelect from "./RegexSelect";
import SearchSelect from "./SearchSelect";

function FormRow(params) {
  return (
    <div className="formRow">
      <RegexSelect />
      <SearchSelect />
      <input type="text" />
    </div>
  );
}
export default FormRow;
