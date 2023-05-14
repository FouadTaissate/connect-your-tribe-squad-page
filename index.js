import express from "express";

const url = "https://whois.fdnd.nl/api/v1/squad/";

const data = await fetch(url).then((response) => response.json());





// Maak een nieuwe express app
const app = express();

// Stel in hoe we express gebruiken
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// Maak een route voor de index
app.get("/", (req, res) => {
  console.log(req.query.squad);

  let slug = req.query.squad || 'squat-c-2022'
  let orderBy = req.query.orderBy || 'name'
  let direction

  
  let role = req.query.role
  
  switch (orderBy) {
    case "name-AZ":
        orderBy = "name"
        direction = "ASC"
        break;
    case "name-ZA":
        orderBy = "name"
        direction = "DESC"
        break;
    case "surname-AZ":
        orderBy = "surname"
        direction = "ASC"
        break;
    case "surname-ZA":
        orderBy = "surname"
        direction = "DESC"
        break;
    case "nickname-AZ":
        orderBy = "nickname"
        direction = "ASC"
        break;
    case "nickname-ZA":
        orderBy = "nickname"
        direction = "DESC"
        break;                                
    
}

let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=' + direction;
// let squadUrl = `${url}${slug}?orderBy=orderBy&direction=${direction}`;


console.log(squadUrl)


fetchJson(squadUrl).then((data) => {
  res.render('index', data)
})
});



// Stel het poortnummer in en start express
app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
};