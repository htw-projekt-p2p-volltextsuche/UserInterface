import { useState } from "react";
import { useForm } from "react-hook-form";
import ListElement from "./ListElement"
function SearchForm(params) {
  const { register, unregister, handleSubmit, getValues } = useForm();

  const onSubmit = (data) => {
    //console.log(buildJSON(data))
    //mockQueryResult()
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
            {...register("speakerMain")}
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
            {...register("affiliationMain")}
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
    fetchFromMongo(data).then(setResultListEntries);
  }

  async function fetchFromMongo(data) {
    return await Promise.all(
      data.results.map((metaData) => getMetaData(metaData.doc_id))
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
    let speakerMain = {
      criteria: "speaker",
      value: getValues("speakerMain"),
    };
    if (speakerMain.value !== "") {
      filter.push(speakerMain);
    }
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
    let affiliationMain = {
      criteria: "affiliation",
      value: getValues("affiliationMain"),
    };
    if (affiliationMain.value !== "") {
      filter.push(affiliationMain);
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
    console.log(JSON.stringify(query));
    return JSON.stringify(query);
  }

  function sendQuery(json) {
    fetch(
      window.location.protocol +
        "//" +
        window.location.host +
        ":8421/api/searches"/*"http://172.17.0.1:8421/api/searches"*/,
      {
        method: "POST",
        body: json,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((responseJson) => responseJson.body.getReader().read())
      .then(({ _, value }) => buildResultList(value))
      .catch((error) => console.log(error));
  }

  function getMetaData(uuid) {
    const url = process.env.REACT_APP_MONGO_BACKEND_CONNECTION_STRING;
    return fetch(url /*"http://172.17.0.1:8081*/+ "/api/protocol/"+ uuid, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "no-cors",
        Accept: "application/json",
      },
    })
      .then((responseJson) => responseJson.body.getReader().read())
      .then(({ _, value }) => new TextDecoder().decode(value))
      .then((string) => JSON.parse(string))
      .then((data) => addListElement(data.data))
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

  function addListElement(data) {
    const title = (data.title.length > 250) ? data.title.substring(0, 250) + "..." : data.title
        return (
      <ListElement key={data.doc_id} speaker={data.speaker} title={title} affiliation={data.affiliation} date={data.date} text={data.text}/>
    );
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


  function mockQueryResult() {
    let data = {
      
        "title" : " Abgabe einer Regierungserklärung durch die Bundeskanzlerin: zum Europäischen Rat am 19./20. Dezember 2013 in Brüssel",
        "speaker" : "Wolfgang Gehrcke",
        "affiliation" : "DIE LINKE",
        "date" : "2013-12-19",
        "text" : "Herzlichen Dank. – Herr Präsident! Verehrte Kolle ginnen und Kollegen! Es sind jetzt zwölf Jahre, in denen der NATOBündnisfall in Kraft ist, und damit auch zwölf Jahre des Krieges gegen den Terror, zwölf Jahre AfghanistanKrieg und ein Hineinziehen Deutschlands in diesen Krieg. Denken Sie noch einmal an den völlig absurden Ausspruch des damaligen Bundeskanzlers Gerhard Schröder von der uneingeschränkten Solidarität. Uneingeschränkt bin ich nicht mal mit mir selbst solidarisch. Das war eine Bekenntnispolitik, die unerträglich ist. (Beifall bei der LINKEN) Ich finde, jetzt muss man auch einmal den Mut haben, nüchtern Bilanz zu ziehen. Es gab damals drei Argumente: Man braucht den Krieg gegen den Terror, um erstens die Gewalt einzudämmen, zweitens Abrüstung herbeizuführen und drittens Demokratie zu erreichen. Jetzt wollen wir uns das einmal anschauen. Zum ersten Argument. Der Krieg gegen den Terror hat die Gefahr von Gewalt und die Gewalt selbst nicht eingedämmt; ganz im Gegenteil. Dieser Krieg gegen den Terror hat Zigtausende Menschen in verschiedenen Teilen der Welt in den terroristischen Untergrund getrieben und damit den Terror erhöht. Gesellschaftsordnungen, die akzeptieren, dass jeden Tag 57 000 Menschen in der Welt verhungern, die sich abschotten, die das Mittelmeer zum großen Friedhof gemacht haben, haben die Moral verloren, mit der sich ein solcher Anspruch legitimieren lässt. (Beifall bei der LINKEN) Solche Gesellschaftsordnungen säen Gewalt und ernten Hass. Also, Gewalt ist nicht abgebaut worden. Zum zweiten Argument. Ist die Gefahr der Weiterverbreitung von Massenvernichtungswaffen kleiner geworden? Sie ist größer geworden. Es sieht doch heute jeder, dass sie größer geworden ist; es gibt chemische, biologische, bakteriologische Waffen in vielen Teilen der Welt. Was die Entwicklung von Atomwaffen angeht, so stehen viele Länder an der Schwelle, es zu können, wenn sie es wollten. Es gibt zwei Lichtblicke. Das eine ist die Entscheidung, die syrischen Chemiewaffen zu vernichten – das ist wirklich eine wichtige Entscheidung, weil es eine Entscheidung gegen den Krieg und für Diplomatie war –, und das andere ist die Vereinbarung mit dem Iran, die in Fragen Atomwaffen im Nahen Osten außerordentlich wichtig ist. Also, der Krieg gegen den Terror hat die Gefahr der Weiterverbreitung von Massenvernichtungswaffen nicht eingeschränkt. Zum dritten Argument. Hat der Krieg gegen den Terror mehr Demokratie gebracht? Wissen Sie, ich habe den Eindruck, dass wir dem, was wir zu bekämpfen vorgeben, immer ähnlicher werden, und das macht mich in einem außerordentlich großen Maße besorgt. Die Spionagegeschichte der NSA und anderer Geheimdienste, auch des BND, wird damit begründet, dass man Terroristen entlarven muss. Der Krieg gegen den Terror hat nicht mehr Demokratie gebracht, sondern Demokratie vernichtet. (Beifall bei der LINKEN) Schließlich – ich bitte Sie, sich das anzuschauen –: Die doppelten Standards sind zum Normalfall geworden. Deutsche Konzerne verkaufen Waffen auch in Spannungsgebiete – mit Billigung der Bundesregierung. Heckler & Koch ist eine Umschreibung für „Mord und Totschlag“ geworden; auch das sollte man einmal festhalten. (Thomas Stritzl [CDU/CSU]: Oh Mann!) Mit korrupten und antidemokratischen Regimen wie SaudiArabien, Katar und anderen ist unser Land verbündet. Auch das ist Ergebnis des Kriegs gegen den Terror, weil wir wahllos geworden sind. Wenn das alles stimmt – wenn nicht, dann widerlegen Sie mir das; das werden Sie nicht können –, dann muss man den NATOBündnisfall aufheben – rechtlich ist er sowieso überwunden –, die Beteiligung am Krieg gegen den Terror einstellen und sofort und bedingungslos aus Afghanistan abziehen. Das ist das Gebot der Stunde. (Beifall bei der LINKEN) Vor Weihnachten darf man ein paar Wünsche äußern. Ich wünsche mir, dass Sie an Weihnachten in sich gehen, begreifen, dass diese ganze Politik falsch ist, zu einer anderen politischen Linie kommen, dass wir hier gemeinsam über Friedenspolitik reden können, dass Schluss ist mit dem Krieg gegen den Terror, dass der NATOBündnisfall aufgehoben wird. Wenn Sie dabei, weil Sie an mich denken, auch gleich noch entscheiden, die NATO aufzulösen, bin ich natürlich außerordentlich dankbar. Herzlichen Dank. (Beifall bei der LINKEN) "
      }
    
  }

