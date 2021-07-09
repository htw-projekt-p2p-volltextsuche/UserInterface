import { useState } from "react";
import { useForm } from "react-hook-form";
function SearchForm(params) {
  const { register, unregister, handleSubmit, getValues } = useForm();

  const onSubmit = (data) => {
    //console.log(buildJSON(data));
    //mockQueryResult();
    sendQuery(buildJSON(data));
  };
  const [resultListEntries, setResultListEntries] = useState([]);
  const [rowKey, setRowKey] = useState(0);
  const [inputFulltextList, setInputFulltextList] = useState([]);

  const [inputSpeakerList, setInputSpeakerList] = useState([]);

  const [inputAffiliationList, setInputAffiliationList] = useState([]);

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="formMainRow">
          <label className="freieSucheLabel">Freie Suche</label>
          <br />
          <input
            className="mainTextInput"
            type="text"
            {...register("mainTerm")}
          ></input>
          <input
            className="formEditButton"
            type="button"
            value="+"
            onClick={addFulltextFormRow}
          ></input>
        </div>
        {inputFulltextList}
        <br />

        <div className="formMainRow">
          <label className="freieSucheLabel">Redner</label>
          <br />
          <input
            className="mainTextInput"
            type="text"
            {...register("speaker0")}
          ></input>
          <input
            className="formEditButton"
            type="button"
            value="+"
            onClick={addSpeakerFormRow}
          ></input>
        </div>

        {inputSpeakerList}
        <br />

        <div className="formMainRow">
          <label className="freieSucheLabel">Partei</label>
          <br />
          <input
            className="mainTextInput"
            type="text"
            {...register("affiliation0")}
          ></input>
          <input
            className="formEditButton"
            type="button"
            value="+"
            onClick={addAffiliationFormRow}
          ></input>
        </div>
        {inputAffiliationList}
        <input id="formSubmit" type="submit"></input>
      </form>
      {resultListEntries}
    </div>
  );

  function buildResultList(data) {
    var string = new TextDecoder().decode(data);
    data = JSON.parse(string);
    let i = 0;
    let entries = [];
    let metaData = {};
    while (i < data.results.length) {
      //metaData = getMetaData(data.results[i].docId);
      entries.push(
        addListElement(
          i,
          data.results[i].doc_id,
          metaData.speaker,
          metaData.affiliation,
          metaData.date,
          metaData.sample
        )
      );
      i++;
    }
    setResultListEntries(entries);
    return resultListEntries;
  }

  function getMetaData(uuid) {
    const username = process.env.MONGO_INITDB_ROOT_USERNAME;
    const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
    const url = process.env.MCLI_OPS_MANAGER_URL;

    let MongoClient = require("mongodb").MongoClient;
  }

  function addListElement(i, title, speaker, affiliation, date, sample) {
    return (
      <div key={i} className="listElement">
        <div className="elementTitel">{title}</div>
        <div className="elementExtra">
          {speaker}
          {affiliation}
          {date}
        </div>
        <div className="textSample">{sample}</div>
      </div>
    );
  }

  function buildJSON() {
    let additions = [];

    for (let index = 0; index < inputFulltextList.length; index++) {
      let fulltextKey = "fulltext" + index;
      let operatorKey = "fulltextOperator" + index;
      let addition = {
        connector: getValues(operatorKey),
        terms: getValues(fulltextKey),
      };
      if (addition.terms !== "") {
        additions.push(addition);
      }
    }

    let filter = [];

    for (let index = 0; index < inputSpeakerList.length; index++) {
      let speakerKey = "speaker" + index;
      let oneFilter = {
        criteria: "speaker",
        value: getValues(speakerKey),
      };
      if (oneFilter.value !== "") {
        filter.push(oneFilter);
      }
    }

    for (let index = 0; index < inputAffiliationList.length; index++) {
      let affiliationKey = "affiliation" + index;
      let oneFilter = {
        criteria: "affiliation",
        value: getValues(affiliationKey),
      };
      if (oneFilter.value !== "") {
        filter.push(oneFilter);
      }
    }

    let terms = getValues("mainTerm");
    let query = {
      search: {
        max_results: 25,
        query: {
          terms: terms,
          additions: additions,
        },
        filter: filter,
      },
    };
    return JSON.stringify(query);
  }

  function sendQuery(json) {
    fetch(
      window.location.protocol +
        "//" +
        window.location.host +
        ":8421/api/searches",
      {
        method: "POST",
        body: json,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
      }
    )
      .then((responseJson) => responseJson.body.getReader().read())
      .then(({ _, value }) => buildResultList(value))
      .catch((error) => console.log(error));
  }

  function addFulltextFormRow() {
    setInputFulltextList((prevInputFulltextList) => {
      return prevInputFulltextList.concat(addFormRow(rowKey, "fulltext"));
    });
  }
  function addSpeakerFormRow() {
    setInputSpeakerList((prevInputSpeakerList) => {
      return prevInputSpeakerList.concat(addFormRow(rowKey, "speaker"));
    });
  }
  function addAffiliationFormRow() {
    setInputAffiliationList((prevInputAffiliationList) => {
      return prevInputAffiliationList.concat(addFormRow(rowKey, "affiliation"));
    });
  }

  function removeFulltextFormRow(key) {
    setInputFulltextList((prevInputFulltextList) => {
      return prevInputFulltextList.filter(
        (formRow) => formRow.key !== key.toString()
      );
    });
  }

  function removeSpeakerFormRow(key) {
    setInputSpeakerList((prevInputSpeakerList) => {
      return prevInputSpeakerList.filter(
        (formRow) => formRow.key !== key.toString()
      );
    });
  }

  function removeAffiliationFormRow(key) {
    setInputAffiliationList((prevInputAffiliationList) => {
      return prevInputAffiliationList.filter(
        (formRow) => formRow.key !== key.toString()
      );
    });
  }

  function addFormRow(key, type) {
    setRowKey((prevRowKey) => prevRowKey + 1);
    if (type === "fulltext") {
      return (
        <div key={key} className="formRow">
          <select
            className="regexSelect"
            {...register("fulltextOperator" + key)}
          >
            <option value="and">und</option>
            <option value="or">oder</option>
            <option value="and_not">und nicht</option>
          </select>
          <br />
          <input type="text" {...register("fulltext" + key)} />
          <input
            className="formEditButton"
            type="button"
            value="-"
            onClick={() => {
              unregister("fulltext" + key);
              unregister("fulltextOperator" + key);
              removeFulltextFormRow(key);
            }}
          />
        </div>
      );
    } else if (type === "speaker") {
      return (
        <div key={key} className="formRow">
          <label className="extraSucheLabel">oder</label>
          <br />
          <input type="text" {...register("speaker" + key)} />
          <input
            className="formEditButton"
            type="button"
            value="-"
            onClick={() => {
              unregister("speaker" + key);
              removeSpeakerFormRow(key);
            }}
          />
        </div>
      );
    } else if (type === "affiliation") {
      return (
        <div key={key} className="formRow">
          <label className="extraSucheLabel">oder</label>
          <br />
          <input type="text" {...register("affiliation" + key)} />
          <input
            className="formEditButton"
            type="button"
            value="-"
            onClick={() => {
              unregister("affiliation" + key);
              removeAffiliationFormRow(key);
            }}
          />
        </div>
      );
    }
  }
}
export default SearchForm;


/*
  function mockQueryResult() {
    let data = {
      total: 1,
      results: [
        {
          doc_id: "2cd6a8db-fdcd-4f56-9356-5e937540c94b",
          score: 1.870930349021494,
        },
      ],
    };
    buildResultList(data);
  }
*/