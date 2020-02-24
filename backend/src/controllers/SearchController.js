const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    const techsArray = parseStringAsArray(techs);

    console.log(techsArray);

    //Filtros dos Devs
    const devs = await Dev.find({
      techs: {
        //Filtrar aonde tem tecnologias que foi colocado no filtro
        $in: techsArray
      },
      location: {
        //Procurar Devs por raio de 10km usando $near, $geometry, $maxDistance
        $near: {
          $geometry: {
            //$geometry sempre receberá um type e coordinates [long, lat]
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json({ devs });
  }
};
