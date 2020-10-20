const Database = require("./database/db")
const saveFosterHome = require("./database/saveFosterHome")

module.exports = {
  index(req, res) {
    return res.render("index")
  },

  async fosterHome(req, res) {
    const id = req.query.id

    try {
      const db = await Database
      const results = await db.all(
        `SELECT * FROM fosterHomes WHERE id = "${id}"`
      )

      const fosterHome = results[0]

      fosterHome.images = fosterHome.images.split(",")
      fosterHome.firstImage = fosterHome.images[0]

      if (fosterHome.open_on_weekends == "0") {
        fosterHome.open_on_weekends = false
      } else {
        fosterHome.open_on_weekends = true
      }

      return res.render("foster-home", { fosterHome })
    } catch (error) {
      console.log(error)
      return res.send("Erro no banco de dados! (async fosterHome)")
    }
  },

  async fosterHomes(req, res) {
    try {
      const db = await Database
      const fosterHomes = await db.all("SELECT * FROM fosterHomes")
      return res.render("foster-homes", { fosterHomes })
    } catch (error) {
      console.log(error)
      return res.send("Erro no banco de dados! (async fosterHomes)")
    }
  },

  createFosterHome(req, res) {
    return res.render("create-foster-home")
  },

  async saveFosterHome(req, res) {
    const fields = req.body

    //validar se todos os campos estão preenchidos
    if (Object.values(fields).includes("")) {
      return res.send("Todos os campos devem ser preenchidos!")
    }

    try {
      //salvar um Lar de adoção
      const db = await Database
      await saveFosterHome(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends
      })

      //depois que salva o form, redireciona o usuário de volta para o mapa
      return res.redirect("/foster-homes")
    } catch (error) {
      console.log(error)
      return res.send("Erro no banco de dados! (async saveFosterHome)")
    }
  }
}