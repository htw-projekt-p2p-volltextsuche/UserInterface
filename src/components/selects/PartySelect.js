function PartySelect(props) {
  return (
    <select>
      <option value="Partei 1">Partei 1</option>
      <option value="Partei 2">Partei 2</option>
      <option value="Partei 3">Partei 3</option>
      <option selected value="Alle Parteien">
        Alle Parteien
      </option>
    </select>
  );
}
export default PartySelect;
