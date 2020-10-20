function saveFosterHome(db, fosterHome) {
    return db.run(`
      INSERT INTO fosterHomes (
          lat, 
          lng,
          name,
          whatsapp,
          about,
          images,
          instructions,
          opening_hours,
          open_on_weekends
      ) VALUES (
          "${fosterHome.lat}",
          "${fosterHome.lng}",
          "${fosterHome.name}",
          "${fosterHome.whatsapp}",
          "${fosterHome.about}",
          "${fosterHome.images}",
          "${fosterHome.instructions}",
          "${fosterHome.opening_hours}",
          "${fosterHome.open_on_weekends}"
      );  
    `)
  }
  
  module.exports = saveFosterHome