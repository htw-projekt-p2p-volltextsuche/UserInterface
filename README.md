# User Interface
## Problemstellung
Die UI soll die Eingabe von präzisen Suchanfragen zu den Bundestagsreden ermöglichen, die Suchergebnisse mit ihren Metadaten anzeigen und beim Klick auf eine einzelne Rede den vollen Text anzeigen. Hierbei gab es keine Vorgaben zur technischen Umsetzung.
## Lösungsansatz
Die Benutzeroberfläche wird als React-Web-Applikation mit Javascript umgesetzt. React basiert darauf, die Website in Komponenten zu zerlegen und diese gegebenenfalls wiederverwendbar zu machen. Zusätzlich wurde CSS für das Styling der Komponenten benutzt. Ein dynamisches, erweiterbares Formular soll möglichst genaue Suchanfragen ermöglichen. Ursprünglich sollten neue Formularreihen hinzugefügt werden bei denen man einen logischen Operator sowie Typ (Freie Suche, Partei, Redner) frei auswählen kann. Aus diesem Formular wird eine Query erstellt, die dann an die Volltextsuche geschickt wird. Die Volltextsuche gibt unter anderem Dokumenten-Ids zurück anhand derer aus der MongoDB die Reden mit Metadaten angefragt werden können. Die Anzeige der Ergebnisse wird als Ergebnisliste umgesetzt, bei Klick auf einen Listeneintrag wird die volle Rede angezeigt.<br>
## Probleme
Das Design des Suchformulars musste abgeändert werden, da aufgrund des Aufbaus nicht genau klar war, in welcher Reihenfolge beziehungsweise mit welcher Priorität einzelne Formularreihen ausgewertet werden. Infolgedessen wurde das Suchformular in drei Hauptbereiche eingeteilt: Freie Suche sowie Partei und Redner, die letzteren beiden bieten jedoch keine Auswahl eines logischen Operators mehr an.<br>
Im Laufe des Projekts wurde klar, dass außerdem ein Backend für den Zugriff auf die MongoDB nötig ist, da ein direkter Zugriff aus dem UI nicht möglich ist. Es wurde als simples Node.js Projekt aufgesetzt, das eine GET-Request mit Dokumenten-Id als Übergabeparameter beantworten kann.<br>
Anfangs war eine Sortierung der Suchergebnisse in Diskussion, diese wurde aber bewusst weggelassen, da die Suchergebnisse standardmäßig nach Relevanz sortiert von der Volltextsuche zurückgegeben werden. Eine alphabetisches Sortieren nach Partei oder Titel der Reden erschien obsolet. Durch die Komplexität der Titel wird bei einer alphabetischen Sortierung kein Mehrwert geboten.<br>
## Schlussbetrachtung
Die Anforderungen wurden weitestgehend erfüllt. Aus Zeitmangel wurden einige Features nicht mehr angeboten, wie zum Beispiel Paginierung und das Anzeigen von sinnvollen Textausschnitten in der Suchergebnisliste.
## Verwendung der Software
Für volle Funktionalität muss das User Interface über das [Ops](https://github.com/htw-projekt-p2p-volltextsuche/ops) gestartet werden. 
Für die Nutzung des User Interface benötigt man [Node.js](https://nodejs.org/en/).
Das User Interface ist intern in Frontend und Backend aufgeteilt, diese müssen wenn man sie lokal und alleinstehend ausführen will seperat gestartet werden.
Das Frontend wurde mit [Create-React-App](https://github.com/facebook/create-react-app) initialisiert und lässt sich z.B. mit dem Befehl <code>npm start</code> im "frontend" Ordner starten.
Das Backend ist eine simple Node.js Anwendung das sich mit dem Befehl <code>node index.js</code> im "backend" Ordner, starten lässt.
Es stellt einen Endpunkt für einen GET-Request bereit, dieser kann folgendermaßen <code>http://{hostadress}:{hostport}/api/protocol/doc_id</code> erreicht werden und gibt das Protokoll mit der passenden doc_id zurück, falls dieses gefunden wurde.

