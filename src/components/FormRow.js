import { useState, useRef } from "react";
import RegexSelect from "./RegexSelect";
function FormRow(params) {
  if (params.type === "fulltext") {
    return (
      <div className="formRow">
        <RegexSelect />
        <br />
        <input onChange={e => setInputValue(e.target.value)} type="text" />
      </div>
    );
  } else if (params.type === "speaker") {
    return (
      <div className="formRow">
        <label className="extraSucheLabel">oder</label>
        <br />
        <input  type="text" />
      </div>
    );
  }else if (params.type === "affiliation") {
    return (
      <div className="formRow">
        <label className="extraSucheLabel">oder</label>
        <br />
        <input type="text" />
      </div>
    );
  }
}
export default FormRow;
