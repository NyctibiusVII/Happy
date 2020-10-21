const Database = require("../db")
const saveFosterHome = require("../saveFosterHome")

Database.then(async (db) => {
  await saveFosterHome(db, {
    lat: "", //latitude EX: -12.3456789
    lng: "", //longitude EX: 98.7654321
    name: "", //nome do local
    about:"", //sobre o local
    whatsapp: "", //EX: (11) 91234-5678
    images: ["https://comabe.ind.br/static/images/sem_foto.png","https://comabe.ind.br/static/images/sem_foto.png","https://comabe.ind.br/static/images/sem_foto.png","https://comabe.ind.br/static/images/sem_foto.png","https://comabe.ind.br/static/images/sem_foto.png","https://comabe.ind.br/static/images/sem_foto.png"].toString(), //links p/ imgs
    instructions:"", //instruções p/ visita
    opening_hours: "", //EX: 12:00 as 20:00
    open_on_weekends: "" //0 = não, 1 = sim
  })

  const fosterHomesID = await db.all('SELECT max(id) as id FROM fosterHomes')
  const [lastId] = fosterHomesID
  const {id} = lastId
  const fosterHomes = await db.all('SELECT * FROM fosterHomes WHERE id =' + id)
  //const fosterHomes = await db.all('SELECT * FROM fosterHomes WHERE id = ""')
  
  //console.log(fosterHomesID) //pesquisa           [{id}]
  //console.log(lastId)        //desconstrói array  {id}
  //console.log(id)            //desconstrói objeto id
  console.log(fosterHomes)   //ultima tabela criada
})
process.on("SIGINT", () => {
  db.close()
})



/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SÓ EXECUTE EM CASOS **ESPECÍFICOS** //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/***SÓ RODE UMA VEZ***///WARNINGX
/* 
    $ npm run INSERT-manual
    $ "ENTER"
        .......
        .......
        .......
        Server started
    $ "Ctrl + c"
*/