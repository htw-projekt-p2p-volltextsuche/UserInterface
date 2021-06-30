function FormMainRow(params) {
  return (
    <div className="formMainRow">
      <label className="freieSucheLabel">{params.text}</label>
      <br />
      <input className="mainTextInput" type="text"></input>
    </div>
  );
}
export default FormMainRow;
