function AddSearchButton(params) {
  function addSearchSelect(params) {}
  return (
    <div>
      <input
        type="button"
        className="addSearchButton"
        value="+"
        onClick={addSearchSelect}
      ></input>
    </div>
  );
}
export default AddSearchButton;
