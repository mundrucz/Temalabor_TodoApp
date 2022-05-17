<h1>ToDoApp_temalabor</h1>

Az alkalmazás egy teendőkezelő Single Page Applikáció. Az oldalon lehet új teendőt (todo) felvenni, ilyenkor 3 adatot kell kötelezően megadnunk: a teendő címét, leírását és határidejét. A teendők automatikusan a „todo” állapot legaljára kerülnek. 4 állapotot különböztetünk meg egymástól: „todo”, „in progress”, „done” és „postponed”. Az oldal ezek szerint az állapotok szerint van 4 oszlopra bontva. Egy teendőt később törölhetünk, módosíthatjuk a prioritását (egy fel-, le nyíl kattintásával 1-el kerül feljebb, vagy lejjebb), állapotát, valamint egy külön ablakban szerkeszthető címük, leírásuk és határidejük is.  

<h2>Szoftver felépítése:</h2>
A szoftver 3 projektből áll: 
  <ul>
  <li>ToDoApp_backend</li> 
  <li>TodoApp_frontend</li>
  <li>TodoApp_Tests</li>
  </ul>

<h3>ToDoApp_backend:</h3>
Az applikáció ASP.NET Core Web Api alapú backendjét tartalmazza. Az adatokat MSQL szerverre menti. Az adateléréshez Entity framework-t használ. 

<h4>Controllers</h4>

<h5>ToDosController.cs</h5>

Rest Api hívások segítségével tudjuk elérni az adatbázist. Ezeknek a hívások logikáját tartalmazza az osztály. 
<ul>
  <li><strong>GET(api/todos)</strong> - az adatbázisban lévő összes adatot visszaadja</li>
  <li><strong>GET (api/todos/id)</strong> - egy adott id-vel rendelkező todo-t ad vissza,</li>
  <li><strong>PUT (api/todo/id)</strong> - egy adott id-val rendelkező todot ad vissza</li>
  <li><strong>POST(api/todos)</strong> - új todo-t hoz létre</li>
  <li><strong>DELETE(api/todos/id)</strong> - adott id-val rendelkező todo-t törlő hívás. Ha egy todo-t kitörültünk egy adott state-ből, a statben lévő todok-hoz tartozó numbereket (ami a prioritást jelöli) frissíti, hogy 0-tól fölfelé növekvő számsort alkossanak, kihagyott szám nélkül.</li>
  </ul>
  
<h4>Models</h4>
<h5>TestDatas.cs</h5>
  Ha az adatbázis üres, 5 darab teszt adattal tölti fel.
  
<h5>ToDo.cs</h5> 
  Egy todo entitást reprezentál. Az alábbi attribútumokat tárolja:
  <ul>
  <li> state (ToDoStates, enum) - az állapotok megfeleltetését számokhoz rendeli (0-todo, 1-inprogress, 2-done, 3-postponed)</li>
    <li> id (long) - egyedi azonosító</li>
    <li> title (String) - cím</li>
    <li> number (int) - staten belüli prioritás</li>
    <li> deadline (LocalDateTime) - határidő</li>
    <li> note (String) - leírás/megjegyzés</li>
  </ul>
  
  <h5>TodoContext</h5> 
  Kapcsolatot állít fel (vagy létrehozza, ha még nem létezik),  egy (localdb)\\mssqllocaldb szervernévvel rendelkező adatbázisban egy TodoContext nevű adatbázisban egy dbo.Todo táblával, ahol tárolni fogja az alkalmazás todok adatait. Az adateléréshez EntityFrameworkot használ.

<h4>Migrations</h4>
generált mappa - Add-Migration Init
  
<h5>TodoContextModelSnapshot.cs</h5>
  Todo adatbázisbeli reprezentációját tartalmazza: 
  <ul>
    <li> Id - adatbázis generálja, minden todo-ra egyedi</li>
    <li> Deadline - datetime2 </li>
    <li> Note - navchar(max), required </li>
    <li> Number - int</li>
    <li> State- int</li>
    <li> Title - navchar(max)</li>
  </ul>
  
<h4>Program.cs</h4> Felépíti az sql szerverrel a kapcsolatot és elindítja a szervert.
<h3>TodoApp_frontend</h3>
A frontend Reacttel készült. React bootstrapet és  React bootstrap icons-t használ.  
<h4>App.js</h4>
Az oldal megjelenítésért felelős file. Egy App componenst és egy Todo osztályt tartalmaz. A Todo osztály a todo adatstruktúráját tárolja. Az App oszályban van minden, ami a megjelenítéshez kell:
<ul>
  <li>async saveChanges () -változtatások mentése, post api hívás</li>
  <li>openForm ( todo ) – szerkesztőablak megjelenítése</li>
  <li>closeForm () – szerkesztőablak bezárása</li>
  <li>async addNewToDo () – új todo felvétele, put api hívás</li>
  <li>async removeTodo( todo, state, key ) – todo törlése, delete api hívás</li>
  <li>async changeState( todo, state, prevState, newState ) – todo state-nek megváltoztatása, post api hívás</li>
  <li>async changePriorityUp ( todo, state, key ) – todo prioritása egyel feljebb való mozgatása, post api hívás</li>
  <li>async changePriorityDown( todo, state, key) - todo prioritása egyel lejebb való mozgatása, psot api hívás</li>
  <li>async populateToDoData () – az oldal megjelenítésekor a todo-k betöltése, get api hívás</li>
</ul>

<h3>TodoApp_Tests</h3>
<h4>MemoryDatabase.cs<h4>
  Felállít egy memóriaalapú adatbázist, amit a tesztekhez tudunk használni.
  
<h4>Test.cs<h4> 
  4 tesztet tartalmaz. Minden Api hívásra (GET, PUT, POST, DELETE). egyet-egyet. Tesztelésnek alapul vesszük a seedData-ban létrehozott teszt adatokat,

<h2>Szoftver beüzemelése<h2>
Szükséges NuGet package-k backend-hez:
  <ul>
    <li>Microsoft.EntityFrameworkCore.SqlServer</li>
    <li>Microsoft.EntityFrameworkCore.Tools</li>
    <li>Microsoft.Extensions.Configuration</li>
    <li>Microsoft.VisualStudio.Web.CodeGeneration.Design</li>
  </ul>

Szükséges Node Package-k frontend-hez:
(Node Package Manager  (npm install))
  <ul>
    <li>react-bootstrap-icons</li>
    <li>react-bootstrap</li>
    <li>axios></li>
  </ul>
Szükséges NuGet package-k a tesztekhez:
  <ul>
    <li>Microsoft.AspNetCore.Mvc.Tesing</li>
    <li>Microsoft.EntityFrameworkCore.Sqlite</li>
    <li>Microsoft.Net.Test.Sdk</li>
    <li>MSTest.TestAdapter</li>
    <li>MSTest.TestFramework</li>
    <li>Mcrosoft.ASpNet.WebPages</li>
    <li>WebGrease</li>
  </ul>

A backend appsetting.json-jába található, az adatbázis csatlakozásához szükséges szervernév és adatbázis név connection stringje.
A programhoz visual studio 2022 verziója szükséges, elindításával a backend kód indul el először, majd a frontend alkalmazás nyílik meg egy oldalon, viszont lehetséges, hogy a backend több idő mire feláll, így az ablakot újra kell tölteni, hogy az adatok megjelenjenek az adatbázisból.
