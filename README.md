<h1>ToDoApp_temalabor</h1>

Az alkalmazás egy teendőkezelő Single Page Applikáció. Az oldalon lehet új teendőt (todo) felvenni, ilyenkor 3 adatot kell kötelezően megadnunk: a teendő címét, leírását és határidejét. A teendők automatikusan a „todo” állapot legaljára kerülnek. 4 állapotot különböztetünk meg egymástól: „todo”, „in progress”, „done” és „postponed”. Az oldal ezek szerint az állapotok szerint van 4 oszlopra bontva. Egy teendőt később törölhetünk, módosíthatjuk a prioritását (egy fel-, le nyíl kattintásával 1-el kerül feljebb, vagy lejjebb), állapotát, valamint egy külön ablakban szerkeszthető címük, leírásuk és határidejük is.  

<h2>Szoftver felépítése:</h2>
A szoftver 3 projektből áll: 
  <ul>
  <li>ToDoApp_backend</li> 
  <li>TodoApp_frontend</li>
  <li>TodoApp_Tests<</li>
  </ul>

<h3>ToDoApp_backend:</h3>
Ez a projekt az applikáció  ASP.NET Core Web Api alapú backendjét tartalmazza. Az adatokat MSQL szerverre menti. Az adateléréshez Entity framework-t használ. 
Controllers:
ToDosController.cs:
Rest Api hívások segítségével tudjuk elérni az adatbázist. Ezeknek a hívások logikáját tartalmazza az osztály. 
GET,(api/todos) - az adatbázisban lévő összes adatot visszaadja
GET (api/todos/id) - egy adott id-vel rendelkező todo-t ad vissza, 
PUT (api/todo/id) - egy adott id-val rendelkező todot ad vissza, 
POST(api/todos)-új todo-t hoz létre, 
DELETE(api/todos/id)-adott id-val rendelkező todo-t törlő hívás. Ha egy todo-t kitörültünk egy adott state-ből, a statben lévő todok-hoz tartozó numbereket (ami a prioritást jelöli) frissíti, hogy 0-tól fölfelé növekvő számsort alkossanak, kihagyott szám nélkül.
Models:
TestDatas: Ha az adatbázis üres, 5 darab teszt adattal tölti fel.
ToDo: Egy todo entitást reprezentál. Rendelkezik egy ToDoStates  (enum)  típusú stattel, ami az állapotok megfeleltetését számokhoz rendeli (0-todo, 1-inprogress, 2-done, 3-postponed), valamint tárolja a todo egyedi azonosítóját (id) , címét (title) , prioritását (number), határidejét(deadline), és leírását(note).
TodoContext: Ez az osztály hoz létre egy (localdb)\\mssqllocaldb szervernévvel rendelkező adatbázisban egy TodoContext nevű adatbázist dbo.Todo táblát, ahol tárolni fogja az alkalmazás a todok adatait. Az adateléréshez EntityFrameworkot használ.

Migrations :
generált mappa - Add-Migration Init
TodoContextModelSnapshot: egy todo adatbázisbeli reprezentációját tartalmazza: 
Id-adatbázis generálja, minden todora egyedi, Deadline :datetime2, Note-navchar(max) (required)
  Number-int, State-int, Title-int(required)
Program.cs: Felépíti az sql szerverrel a kapcsolatot és elindítja a szervert.
TodoApp_frontend:
A frontend Reacttel készült. React bootstrapet és  React bootstrap icons-t használ.  
App.js:
Az oldal megjelenítésért felelős React alapú file. egy App componenst és egy Todo osztályt tartalmaz. A Todo osztály a todo adatstruktúráját tárolja. Az App oszályban van minden, ami a megjelenítéshez kell.
async saveChanges () -változtatások mentése, post api hívás
openForm ( todo ) – szerkesztőablak megjelenítése
closeForm () – szerkesztőablak bezárása
async addNewToDo () – új todo felvétele, put api hívás
async removeTodo( todo, state, key ) – todo törlése, delete api hívás
async changeState( todo, state, prevState, newState ) – todo state megváltoztatása, post api hívás
async changePriorityUp ( todo, state, key ) – todo prioritása egyel feljebb való mozgatása, psot api hívás
async changePriorityDown( todo, state, key) - todo prioritása egyel lejebb való mozgatása, psot api hívás
async populateToDoData () – az oldal megjelenítésekor a todo-k betöltése, get api hívás

TodoApp_Tests:
MemoryDatabase: Felállít egy memóriaalapú adatbázist, amit a tesztekhez tudunk használni.
Test.cs: A test.cs osztály 4 tesztet tartalmaz. Minden Api hívásra (GET, PUT, POST, DELETE). egyet-egyet. Tesztelésnek alapul vesszük a seedData-ban létrehozott adatokat,

Szoftver beüzemelése:
A szoftver működéséhez az alábbi NuGet packagesek szükségesek:
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools
Microsoft.Extensions.Configuration
Microsoft.VisualStudio.Web.CodeGeneration.Design

frontendhez szükséges még:
Node Package Manager  (npm install)
react-bootstrap-icons (npm package)
react-bootstrap (npm package)
axios(npm package)

tesztekhez:
Microsoft.AspNetCore.Mvc.Tesing
Microsoft.EntityFrameworkCore.Sqlite
Microsoft.Net.Test.Sdk
MSTest.TestAdapter
MSTest.TestFramework
Mcrosoft.ASpNet.WebPages
WebGrease


A backend appsetting.json-jába található, a az adatbázis csatlakozásához szükséges szervernév és adatbázis név, ennek átírásával, testreszabható.
A program visual studio 2022 verziója szükséges, elindtásával a backend kód indul el először, majd a frontend React alkalmazás nyílik meg, viszont lehetséges, hogy a backend több idő mire feláll, így az ablakot újra kell tölteni, hogy az adatok megjenkjenek az adatbázisból.
