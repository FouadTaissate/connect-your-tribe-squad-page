import express from "express";


// Haalt de API gegevens op
const url = 'https://whois.fdnd.nl/api/v1/members?first=200'
//  Haalt alle data op en wacht voordat voorgaande functions worden uitgevoerd
const data = await fetch(url)
  .then((response) => response.json())
  .catch((error) => error)

// Haalt de API gegevens op
const urlA = 'https://whois.fdnd.nl/api/v1/squad/squad-a-2022'
//  Haalt alle data op en wacht voordat voorgaande functions worden uitgevoer
const dataA = await fetch(urlA)
  .then((response) => response.json())
  .catch((error) => error)

// API met alle studenten van Squad B
const urlB= 'https://whois.fdnd.nl/api/v1/squad/squad-b-2022'
const dataB = await fetch(urlB)
  .then((response) => response.json())
  .catch((error) => error)

// API met alle studenten van Squat C
const urlC = 'https://whois.fdnd.nl/api/v1/squad/squat-c-2022'
const dataC = await fetch(urlC)
  .then((response) => response.json())
  .catch((error) => error)



console.log(data);

// Maak een nieuwe express app
const app = express();

// Stel in hoe we express gebruiken
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// Maak een route voor de index
app.get("/", (request, response) => {
  console.log(request.query.squad);

  response.render("index", data);
});

app.get('/squad-A', function (req, res) {

  let slug = req.query.squad || 'squad-a-2022'
  let orderBy = req.query.orderBy || 'name' + '&direction=ASC'
  let squadUrl = urlA + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((dataA) => {
    res.render('squad-A', dataA)
  })
})

// Maakt een route voor de squad B pagina
app.get('/squadB', function (req, res) {

  let slug = req.query.squad || 'squad-a-2022'
  let orderBy = req.query.orderBy || 'name' + '&direction=ASC'
  let squadUrl = urlB + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((dataB) => {
    res.render('squadB', dataB)
  })
})

// Maakt een route voor de squat C pagina
app.get('/squat-C', function (req, res) {

  let slug = req.query.squad || 'squad-a-2022'
  let orderBy = req.query.orderBy || 'name' + '&direction=ASC'
  let squadUrl = urlC + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((dataC) => {
    res.render('squatC', dataC)
  })
})

// Stel het poortnummer in en start express
app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}